package services

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"

	"meditation-app-backend/internal/models"
	"meditation-app-backend/internal/repositories"
	"meditation-app-backend/internal/utils"
)

var (
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrUserExists         = errors.New("user with this email already exists")
	ErrUserNotFound       = errors.New("user not found")
)

type AuthService interface {
	Register(ctx context.Context, email, password string) (*models.User, error)
	Login(ctx context.Context, email, password string) (string, *models.User, error)
	GetMe(ctx context.Context, userID string) (*models.User, error)
	UpdateEmail(ctx context.Context, userID, email string) (*models.User, error)
	DeleteAccount(ctx context.Context, userID string) error
}

type authService struct {
	users     repositories.UserRepository
	jwtSecret string
}

func NewAuthService(users repositories.UserRepository, jwtSecret string) AuthService {
	return &authService{
		users:     users,
		jwtSecret: jwtSecret,
	}
}

func (s *authService) Register(ctx context.Context, email, password string) (*models.User, error) {
	email = strings.TrimSpace(strings.ToLower(email))
	password = strings.TrimSpace(password)

	if !strings.Contains(email, "@") {
		return nil, errors.New("valid email is required")
	}
	if len(password) < 6 {
		return nil, errors.New("password must contain at least 6 characters")
	}

	existing, err := s.users.GetByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return nil, ErrUserExists
	}

	hash, err := utils.HashPassword(password)
	if err != nil {
		return nil, err
	}

	user := &models.User{
		ID:           uuid.NewString(),
		Email:        email,
		PasswordHash: hash,
		CreatedAt:    time.Now().UTC(),
	}

	if err := s.users.Create(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *authService) Login(ctx context.Context, email, password string) (string, *models.User, error) {
	email = strings.TrimSpace(strings.ToLower(email))
	password = strings.TrimSpace(password)

	user, err := s.users.GetByEmail(ctx, email)
	if err != nil {
		return "", nil, err
	}
	if user == nil {
		return "", nil, ErrInvalidCredentials
	}

	if err := utils.CheckPassword(password, user.PasswordHash); err != nil {
		return "", nil, ErrInvalidCredentials
	}

	token, err := utils.GenerateToken(user.ID, s.jwtSecret)
	if err != nil {
		return "", nil, err
	}

	return token, user, nil
}

func (s *authService) GetMe(ctx context.Context, userID string) (*models.User, error) {
	user, err := s.users.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, ErrUserNotFound
	}

	return user, nil
}

func (s *authService) UpdateEmail(ctx context.Context, userID, email string) (*models.User, error) {
	email = strings.TrimSpace(strings.ToLower(email))
	if !strings.Contains(email, "@") {
		return nil, errors.New("valid email is required")
	}

	existing, err := s.users.GetByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if existing != nil && existing.ID != userID {
		return nil, ErrUserExists
	}

	if err := s.users.UpdateEmail(ctx, userID, email); err != nil {
		return nil, err
	}

	return s.GetMe(ctx, userID)
}

func (s *authService) DeleteAccount(ctx context.Context, userID string) error {
	user, err := s.users.GetByID(ctx, userID)
	if err != nil {
		return err
	}
	if user == nil {
		return ErrUserNotFound
	}

	return s.users.Delete(ctx, userID)
}
