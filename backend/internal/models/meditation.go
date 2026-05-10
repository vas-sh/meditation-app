package models

import "time"

type Meditation struct {
	ID              string    `json:"id"`
	Title           string    `json:"title"`
	Category        string    `json:"category"`
	DurationMinutes int       `json:"durationMinutes"`
	Description     string    `json:"description"`
	CreatedAt       time.Time `json:"createdAt"`
}
