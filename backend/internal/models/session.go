package models

import "time"

type Session struct {
	ID              string    `json:"id"`
	UserID          string    `json:"userId"`
	MeditationID    string    `json:"meditationId"`
	DurationMinutes int       `json:"durationMinutes"`
	CompletedAt     time.Time `json:"completedAt"`
}

type SessionWithMeditation struct {
	ID              string    `json:"id"`
	UserID          string    `json:"userId"`
	MeditationID    string    `json:"meditationId"`
	MeditationTitle string    `json:"meditationTitle"`
	DurationMinutes int       `json:"durationMinutes"`
	CompletedAt     time.Time `json:"completedAt"`
}
