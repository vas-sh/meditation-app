package services

import (
	"context"

	"meditation-app-backend/internal/models"
	"meditation-app-backend/internal/repositories"
)

type MeditationService interface {
	List(ctx context.Context) ([]models.Meditation, error)
	GetByID(ctx context.Context, id string) (*models.Meditation, error)
}

type meditationService struct {
	repository repositories.MeditationRepository
}

func NewMeditationService(repository repositories.MeditationRepository) MeditationService {
	return &meditationService{repository: repository}
}

func (s *meditationService) List(ctx context.Context) ([]models.Meditation, error) {
	return s.repository.List(ctx)
}

func (s *meditationService) GetByID(ctx context.Context, id string) (*models.Meditation, error) {
	return s.repository.GetByID(ctx, id)
}
