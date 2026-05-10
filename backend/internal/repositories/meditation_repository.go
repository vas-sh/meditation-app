package repositories

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"meditation-app-backend/internal/models"
)

type MeditationRepository interface {
	List(ctx context.Context) ([]models.Meditation, error)
	GetByID(ctx context.Context, id string) (*models.Meditation, error)
	Exists(ctx context.Context, id string) (bool, error)
}

type meditationRepository struct {
	pool *pgxpool.Pool
}

func NewMeditationRepository(pool *pgxpool.Pool) MeditationRepository {
	return &meditationRepository{pool: pool}
}

func (r *meditationRepository) List(ctx context.Context) ([]models.Meditation, error) {
	query := `
		SELECT id, title, category, duration_minutes, description, created_at
		FROM meditations
		ORDER BY created_at ASC
	`

	rows, err := r.pool.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	items := []models.Meditation{}
	for rows.Next() {
		var item models.Meditation
		if err := rows.Scan(&item.ID, &item.Title, &item.Category, &item.DurationMinutes, &item.Description, &item.CreatedAt); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (r *meditationRepository) GetByID(ctx context.Context, id string) (*models.Meditation, error) {
	query := `
		SELECT id, title, category, duration_minutes, description, created_at
		FROM meditations
		WHERE id = $1
	`

	var item models.Meditation
	err := r.pool.QueryRow(ctx, query, id).Scan(&item.ID, &item.Title, &item.Category, &item.DurationMinutes, &item.Description, &item.CreatedAt)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &item, nil
}

func (r *meditationRepository) Exists(ctx context.Context, id string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM meditations WHERE id = $1)`

	var exists bool
	if err := r.pool.QueryRow(ctx, query, id).Scan(&exists); err != nil {
		return false, err
	}

	return exists, nil
}
