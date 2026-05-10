package repositories

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"

	"meditation-app-backend/internal/models"
)

type SessionRepository interface {
	Create(ctx context.Context, session *models.Session) error
	ListByUserID(ctx context.Context, userID string) ([]models.SessionWithMeditation, error)
}

type sessionRepository struct {
	pool *pgxpool.Pool
}

func NewSessionRepository(pool *pgxpool.Pool) SessionRepository {
	return &sessionRepository{pool: pool}
}

func (r *sessionRepository) Create(ctx context.Context, session *models.Session) error {
	query := `
		INSERT INTO sessions (id, user_id, meditation_id, duration_minutes, completed_at)
		VALUES ($1, $2, $3, $4, $5)
	`

	_, err := r.pool.Exec(
		ctx,
		query,
		session.ID,
		session.UserID,
		session.MeditationID,
		session.DurationMinutes,
		session.CompletedAt,
	)
	return err
}

func (r *sessionRepository) ListByUserID(ctx context.Context, userID string) ([]models.SessionWithMeditation, error) {
	query := `
		SELECT s.id, s.user_id, s.meditation_id, m.title, s.duration_minutes, s.completed_at
		FROM sessions s
		JOIN meditations m ON m.id = s.meditation_id
		WHERE s.user_id = $1
		ORDER BY s.completed_at DESC
	`

	rows, err := r.pool.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	items := []models.SessionWithMeditation{}
	for rows.Next() {
		var item models.SessionWithMeditation
		if err := rows.Scan(
			&item.ID,
			&item.UserID,
			&item.MeditationID,
			&item.MeditationTitle,
			&item.DurationMinutes,
			&item.CompletedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}
