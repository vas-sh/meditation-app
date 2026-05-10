CREATE TABLE IF NOT EXISTS meditation_images (
    id UUID PRIMARY KEY,
    meditation_id UUID NOT NULL REFERENCES meditations(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_meditation_images_meditation_id
ON meditation_images (meditation_id, sort_order);

INSERT INTO meditation_images (id, meditation_id, image_url, alt_text, sort_order)
VALUES
    (
        'aaaaaaa1-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80',
        'A calm sunrise scene for Morning Calm meditation',
        0
    ),
    (
        'aaaaaaa2-2222-2222-2222-222222222222',
        '22222222-2222-2222-2222-222222222222',
        'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
        'A peaceful night ocean scene for Deep Sleep meditation',
        0
    ),
    (
        'aaaaaaa3-3333-3333-3333-333333333333',
        '33333333-3333-3333-3333-333333333333',
        'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1400&q=80',
        'A focused mountain landscape for Focus Flow meditation',
        0
    ),
    (
        'aaaaaaa4-4444-4444-4444-444444444444',
        '44444444-4444-4444-4444-444444444444',
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80',
        'A grounding forest path for Stress Relief meditation',
        0
    )
ON CONFLICT (id) DO NOTHING;
