package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"meditation-app-backend/internal/utils"
)

const userIDContextKey = "userID"

func AuthMiddleware(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if header == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "authorization header is required"})
			c.Abort()
			return
		}

		parts := strings.SplitN(header, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization format"})
			c.Abort()
			return
		}

		userID, err := utils.ParseToken(parts[1], secret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		c.Set(userIDContextKey, userID)
		c.Next()
	}
}

func UserIDFromContext(c *gin.Context) (string, bool) {
	value, ok := c.Get(userIDContextKey)
	if !ok {
		return "", false
	}

	userID, ok := value.(string)
	return userID, ok
}
