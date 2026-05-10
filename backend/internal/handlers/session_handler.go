package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"meditation-app-backend/internal/middleware"
	"meditation-app-backend/internal/services"
)

type SessionHandler struct {
	service services.SessionService
}

func NewSessionHandler(service services.SessionService) *SessionHandler {
	return &SessionHandler{service: service}
}

type createSessionRequest struct {
	MeditationID    string `json:"meditationId"`
	DurationMinutes int    `json:"durationMinutes"`
}

func (h *SessionHandler) Create(c *gin.Context) {
	userID, ok := middleware.UserIDFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var req createSessionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	if err := h.service.Create(c.Request.Context(), userID, req.MeditationID, req.DurationMinutes); err != nil {
		if err.Error() == "meditation not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"status": "saved"})
}

func (h *SessionHandler) ListMine(c *gin.Context) {
	userID, ok := middleware.UserIDFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	items, err := h.service.ListMine(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load sessions"})
		return
	}

	c.JSON(http.StatusOK, items)
}
