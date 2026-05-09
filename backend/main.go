package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Meditation struct {
	ID              int    `json:"id"`
	Title           string `json:"title"`
	Category        string `json:"category"`
	DurationMinutes int    `json:"durationMinutes"`
	Description     string `json:"description,omitempty"`
}

var meditations = []Meditation{
	{
		ID:              1,
		Title:           "Morning Calm",
		Category:        "relaxation",
		DurationMinutes: 10,
		Description:     "A short meditation to start the morning calmly.",
	},
	{
		ID:              2,
		Title:           "Deep Sleep",
		Category:        "sleep",
		DurationMinutes: 15,
		Description:     "A gentle evening meditation for better sleep.",
	},
	{
		ID:              3,
		Title:           "Focus Flow",
		Category:        "focus",
		DurationMinutes: 12,
		Description:     "A practice to improve concentration during study or work.",
	},
}

func main() {
	router := gin.Default()
	router.Use(corsMiddleware())

	api := router.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		api.GET("/meditations", func(c *gin.Context) {
			c.JSON(http.StatusOK, meditations)
		})

		api.GET("/meditations/:id", func(c *gin.Context) {
			id, err := strconv.Atoi(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid meditation id"})
				return
			}

			for _, meditation := range meditations {
				if meditation.ID == id {
					c.JSON(http.StatusOK, meditation)
					return
				}
			}

			c.JSON(http.StatusNotFound, gin.H{"error": "meditation not found"})
		})

		api.POST("/sessions", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "session saved"})
		})
	}

	router.Run(":8080")
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}
