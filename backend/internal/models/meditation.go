package models

import "time"

type MeditationStep struct {
	Text        string `json:"text"`
	Duration    int    `json:"duration"`
	SupportText string `json:"supportText,omitempty"`
	Phase       string `json:"phase,omitempty"`
}

type MeditationImage struct {
	ID           string    `json:"id"`
	MeditationID string    `json:"meditationId"`
	ImageURL     string    `json:"imageUrl"`
	AltText      string    `json:"altText,omitempty"`
	SortOrder    int       `json:"sortOrder"`
	CreatedAt    time.Time `json:"createdAt"`
}

type Meditation struct {
	ID              string           `json:"id"`
	Title           string           `json:"title"`
	Category        string           `json:"category"`
	DurationMinutes int              `json:"durationMinutes"`
	Description     string           `json:"description"`
	Steps           []MeditationStep `json:"steps"`
	Images          []MeditationImage `json:"images"`
	CreatedAt       time.Time        `json:"createdAt"`
}
