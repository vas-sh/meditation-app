CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meditations (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    meditation_id UUID REFERENCES meditations(id),
    duration_minutes INT NOT NULL,
    completed_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO meditations (id, title, category, duration_minutes, description)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Morning Calm', 'relaxation', 10, 'A short meditation to start the morning calmly.'),
    ('22222222-2222-2222-2222-222222222222', 'Deep Sleep', 'sleep', 15, 'A gentle evening meditation for better sleep.'),
    ('33333333-3333-3333-3333-333333333333', 'Focus Flow', 'focus', 12, 'A meditation for concentration during study or work.'),
    ('44444444-4444-4444-4444-444444444444', 'Stress Relief', 'stress', 9, 'A short calming practice for stressful moments.')
ON CONFLICT (id) DO NOTHING;
