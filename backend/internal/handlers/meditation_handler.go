package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"meditation-app-backend/internal/services"
)

type MeditationHandler struct {
	service services.MeditationService
}

func NewMeditationHandler(service services.MeditationService) *MeditationHandler {
	return &MeditationHandler{service: service}
}

func (h *MeditationHandler) List(c *gin.Context) {
	items, err := h.service.List(c.Request.Context())
	if err != nil {
		log.Printf("load meditations: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load meditations"})
		return
	}

	c.JSON(http.StatusOK, items)
}

func (h *MeditationHandler) GetByID(c *gin.Context) {
	item, err := h.service.GetByID(c.Request.Context(), c.Param("id"))
	if err != nil {
		log.Printf("load meditation by id: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load meditation"})
		return
	}
	if item == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "meditation not found"})
		return
	}

	c.JSON(http.StatusOK, item)
}
