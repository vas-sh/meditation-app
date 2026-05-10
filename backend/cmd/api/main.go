package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"meditation-app-backend/internal/config"
	"meditation-app-backend/internal/db"
	"meditation-app-backend/internal/handlers"
	"meditation-app-backend/internal/middleware"
	"meditation-app-backend/internal/repositories"
	"meditation-app-backend/internal/services"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("load config: %v", err)
	}

	ctx := context.Background()
	pool, err := db.New(ctx, cfg)
	if err != nil {
		log.Fatalf("connect database: %v", err)
	}
	defer pool.Close()

	userRepository := repositories.NewUserRepository(pool)
	meditationRepository := repositories.NewMeditationRepository(pool)
	sessionRepository := repositories.NewSessionRepository(pool)

	authService := services.NewAuthService(userRepository, cfg.JWTSecret)
	meditationService := services.NewMeditationService(meditationRepository)
	sessionService := services.NewSessionService(sessionRepository, meditationRepository)

	authHandler := handlers.NewAuthHandler(authService)
	userHandler := handlers.NewUserHandler(authService)
	meditationHandler := handlers.NewMeditationHandler(meditationService)
	sessionHandler := handlers.NewSessionHandler(sessionService)

	router := gin.Default()
	router.Use(middleware.CORS())

	api := router.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		api.GET("/meditations", meditationHandler.List)
		api.GET("/meditations/:id", meditationHandler.GetByID)

		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware(cfg.JWTSecret))
		{
			protected.GET("/users/me", userHandler.GetMe)
			protected.PUT("/users/me", userHandler.UpdateMe)
			protected.DELETE("/users/me", userHandler.DeleteMe)

			protected.POST("/sessions", sessionHandler.Create)
			protected.GET("/sessions/me", sessionHandler.ListMine)
		}
	}

	registerFrontendRoutes(router)

	server := &http.Server{
		Addr:              ":" + cfg.AppPort,
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("backend is running on port %s", cfg.AppPort)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("server error: %v", err)
	}
}

func registerFrontendRoutes(router *gin.Engine) {
	distPath := os.Getenv("FRONTEND_DIST")
	if distPath == "" {
		distPath = "./frontend-dist"
	}

	indexPath := filepath.Join(distPath, "index.html")
	if _, err := os.Stat(indexPath); err != nil {
		log.Printf("frontend build not found at %s, skipping static file serving", distPath)
		return
	}

	assetsPath := filepath.Join(distPath, "assets")
	if _, err := os.Stat(assetsPath); err == nil {
		router.Static("/assets", assetsPath)
	}

	router.GET("/", func(c *gin.Context) {
		c.File(indexPath)
	})

	router.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api") {
			c.JSON(http.StatusNotFound, gin.H{"error": "route not found"})
			return
		}

		c.File(indexPath)
	})
}
