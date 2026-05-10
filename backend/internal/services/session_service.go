package services

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"

	"meditation-app-backend/internal/models"
	"meditation-app-backend/internal/repositories"
)

type SessionService interface {
	Create(ctx context.Context, userID, meditationID string, durationMinutes int) error
	ListMine(ctx context.Context, userID string) ([]models.SessionWithMeditation, error)
}

type sessionService struct {
	sessions    repositories.SessionRepository
	meditations repositories.MeditationRepository
}

func NewSessionService(sessions repositories.SessionRepository, meditations repositories.MeditationRepository) SessionService {
	return &sessionService{
		sessions:    sessions,
		meditations: meditations,
	}
}

func (s *sessionService) Create(ctx context.Context, userID, meditationID string, durationMinutes int) error {
	if meditationID == "" {
		return errors.New("meditationId is required")
	}
	if durationMinutes <= 0 {
		return errors.New("durationMinutes must be greater than 0")
	}

	exists, err := s.meditations.Exists(ctx, meditationID)
	if err != nil {
		return err
	}
	if !exists {
		return errors.New("meditation not found")
	}

	session := &models.Session{
		ID:              uuid.NewString(),
		UserID:          userID,
		MeditationID:    meditationID,
		DurationMinutes: durationMinutes,
		CompletedAt:     time.Now().UTC(),
	}

	return s.sessions.Create(ctx, session)
}

func (s *sessionService) ListMine(ctx context.Context, userID string) ([]models.SessionWithMeditation, error) {
	return s.sessions.ListByUserID(ctx, userID)
}
