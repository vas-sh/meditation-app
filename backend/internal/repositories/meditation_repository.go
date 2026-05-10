package repositories

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
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
		SELECT id, title, category, duration_minutes, description, steps, created_at
		FROM meditations
		ORDER BY created_at ASC
	`

	rows, err := r.pool.Query(ctx, query)
	if err != nil {
		if isUndefinedColumnError(err) {
			return r.listWithoutSteps(ctx)
		}
		return nil, err
	}
	defer rows.Close()

	items := []models.Meditation{}
	for rows.Next() {
		item, err := scanMeditation(rows)
		if err != nil {
			return nil, err
		}
		items = append(items, *item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	if err := r.attachImages(ctx, items); err != nil {
		return nil, err
	}

	return items, nil
}

func (r *meditationRepository) GetByID(ctx context.Context, id string) (*models.Meditation, error) {
	query := `
		SELECT id, title, category, duration_minutes, description, steps, created_at
		FROM meditations
		WHERE id = $1
	`

	item, err := scanMeditation(r.pool.QueryRow(ctx, query, id))
	if err != nil {
		if isUndefinedColumnError(err) {
			return r.getByIDWithoutSteps(ctx, id)
		}
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	images, err := r.listImagesByMeditationID(ctx, item.ID)
	if err != nil {
		return nil, err
	}
	item.Images = images

	return item, nil
}

func (r *meditationRepository) listWithoutSteps(ctx context.Context) ([]models.Meditation, error) {
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
		if err := rows.Scan(
			&item.ID,
			&item.Title,
			&item.Category,
			&item.DurationMinutes,
			&item.Description,
			&item.CreatedAt,
		); err != nil {
			return nil, err
		}
		item.Steps = []models.MeditationStep{}
		item.Images = []models.MeditationImage{}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	if err := r.attachImages(ctx, items); err != nil {
		return nil, err
	}

	return items, nil
}

func (r *meditationRepository) getByIDWithoutSteps(ctx context.Context, id string) (*models.Meditation, error) {
	query := `
		SELECT id, title, category, duration_minutes, description, created_at
		FROM meditations
		WHERE id = $1
	`

	var item models.Meditation
	if err := r.pool.QueryRow(ctx, query, id).Scan(
		&item.ID,
		&item.Title,
		&item.Category,
		&item.DurationMinutes,
		&item.Description,
		&item.CreatedAt,
	); err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	item.Steps = []models.MeditationStep{}
	images, err := r.listImagesByMeditationID(ctx, item.ID)
	if err != nil {
		return nil, err
	}
	item.Images = images

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

type meditationScanner interface {
	Scan(dest ...any) error
}

func scanMeditation(scanner meditationScanner) (*models.Meditation, error) {
	var item models.Meditation
	var rawSteps []byte

	if err := scanner.Scan(
		&item.ID,
		&item.Title,
		&item.Category,
		&item.DurationMinutes,
		&item.Description,
		&rawSteps,
		&item.CreatedAt,
	); err != nil {
		return nil, err
	}

	if len(rawSteps) > 0 {
		if err := json.Unmarshal(rawSteps, &item.Steps); err != nil {
			return nil, err
		}
	}

	if item.Steps == nil {
		item.Steps = []models.MeditationStep{}
	}

	if item.Images == nil {
		item.Images = []models.MeditationImage{}
	}

	return &item, nil
}

func (r *meditationRepository) attachImages(ctx context.Context, items []models.Meditation) error {
	if len(items) == 0 {
		return nil
	}

	imageMap, err := r.listAllImages(ctx)
	if err != nil {
		return err
	}

	for index := range items {
		images := imageMap[items[index].ID]
		if images == nil {
			images = []models.MeditationImage{}
		}
		items[index].Images = images
	}

	return nil
}

func (r *meditationRepository) listAllImages(ctx context.Context) (map[string][]models.MeditationImage, error) {
	query := `
		SELECT id, meditation_id, image_url, alt_text, sort_order, created_at
		FROM meditation_images
		ORDER BY meditation_id ASC, sort_order ASC, created_at ASC
	`

	rows, err := r.pool.Query(ctx, query)
	if err != nil {
		if isUndefinedTableError(err) {
			return map[string][]models.MeditationImage{}, nil
		}
		return nil, err
	}
	defer rows.Close()

	result := make(map[string][]models.MeditationImage)
	for rows.Next() {
		image, err := scanMeditationImage(rows)
		if err != nil {
			return nil, err
		}
		result[image.MeditationID] = append(result[image.MeditationID], *image)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return result, nil
}

func (r *meditationRepository) listImagesByMeditationID(ctx context.Context, meditationID string) ([]models.MeditationImage, error) {
	query := `
		SELECT id, meditation_id, image_url, alt_text, sort_order, created_at
		FROM meditation_images
		WHERE meditation_id = $1
		ORDER BY sort_order ASC, created_at ASC
	`

	rows, err := r.pool.Query(ctx, query, meditationID)
	if err != nil {
		if isUndefinedTableError(err) {
			return []models.MeditationImage{}, nil
		}
		return nil, err
	}
	defer rows.Close()

	images := []models.MeditationImage{}
	for rows.Next() {
		image, err := scanMeditationImage(rows)
		if err != nil {
			return nil, err
		}
		images = append(images, *image)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return images, nil
}

func scanMeditationImage(scanner meditationScanner) (*models.MeditationImage, error) {
	var image models.MeditationImage
	if err := scanner.Scan(
		&image.ID,
		&image.MeditationID,
		&image.ImageURL,
		&image.AltText,
		&image.SortOrder,
		&image.CreatedAt,
	); err != nil {
		return nil, err
	}

	return &image, nil
}

func isUndefinedTableError(err error) bool {
	var pgErr *pgconn.PgError
	return errors.As(err, &pgErr) && pgErr.Code == "42P01"
}

func isUndefinedColumnError(err error) bool {
	var pgErr *pgconn.PgError
	return errors.As(err, &pgErr) && pgErr.Code == "42703"
}
