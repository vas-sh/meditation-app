ALTER TABLE meditations
ADD COLUMN IF NOT EXISTS steps JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE meditations
SET
    description = 'A grounding relaxation meditation for easing tension and beginning the day softly.',
    steps = '[
        {"text":"Close your eyes","duration":6,"phase":"relax","supportText":"Let the visual world fall away for a moment."},
        {"text":"Relax your shoulders","duration":7,"phase":"exhale","supportText":"Allow the shoulders to drop with the breath out."},
        {"text":"Release your neck","duration":7,"phase":"relax","supportText":"Notice if your neck is holding effort and soften it."},
        {"text":"Unclench your jaw","duration":6,"phase":"relax","supportText":"Let the face lose any hidden tension."},
        {"text":"Take a gentle inhale","duration":7,"phase":"inhale","supportText":"Invite a slower and more spacious breath in."},
        {"text":"Exhale the tension","duration":8,"phase":"exhale","supportText":"Imagine physical stress leaving the body."},
        {"text":"Notice your hands","duration":6,"phase":"focus","supportText":"Feel warmth, contact, and stillness in the fingers."},
        {"text":"Let thoughts pass","duration":8,"phase":"focus","supportText":"You do not need to follow every thought that appears."},
        {"text":"Feel your body getting lighter","duration":8,"phase":"relax","supportText":"A sense of ease can spread naturally across the body."},
        {"text":"Stay present in the moment","duration":8,"phase":"focus","supportText":"Return to this breath and this exact moment."},
        {"text":"Take one deeper breath","duration":7,"phase":"inhale","supportText":"Gather calm before the session closes."},
        {"text":"Slowly return to awareness","duration":10,"phase":"relax","supportText":"Open your attention gradually and keep the calm with you."}
    ]'::jsonb
WHERE title = 'Morning Calm';

UPDATE meditations
SET
    description = 'An evening sequence that slows the mind and helps the body become ready for rest.',
    steps = '[
        {"text":"Lie down comfortably","duration":7,"phase":"relax","supportText":"Let the body find a natural resting position."},
        {"text":"Soften your forehead","duration":7,"phase":"relax","supportText":"Smooth out tiny lines and release mental effort."},
        {"text":"Relax your jaw","duration":6,"phase":"relax","supportText":"Give the face permission to completely rest."},
        {"text":"Feel your eyelids getting heavy","duration":7,"phase":"relax","supportText":"Imagine the eyes sinking into stillness."},
        {"text":"Notice the weight of your body","duration":9,"phase":"relax","supportText":"Let the bed or pillow fully support you."},
        {"text":"Take a slow inhale","duration":7,"phase":"inhale","supportText":"Breathe in gently without lifting the body too much."},
        {"text":"Make the exhale longer","duration":8,"phase":"exhale","supportText":"The long breath out signals safety and rest."},
        {"text":"Release your chest and belly","duration":8,"phase":"relax","supportText":"Let the breathing become softer and quieter."},
        {"text":"Let the thoughts fade away","duration":9,"phase":"focus","supportText":"No need to solve anything tonight."},
        {"text":"Drift into calmness","duration":10,"phase":"relax","supportText":"Imagine floating into a quieter inner space."},
        {"text":"Stay with the silence","duration":9,"phase":"hold","supportText":"Allow the stillness to remain without effort."},
        {"text":"Sink deeper into rest","duration":11,"phase":"exhale","supportText":"With each breath out, feel yourself settling more deeply."}
    ]'::jsonb
WHERE title = 'Deep Sleep';

UPDATE meditations
SET
    description = 'A guided concentration session for studying, planning or deep work.',
    steps = '[
        {"text":"Sit comfortably","duration":6,"phase":"focus","supportText":"Find a posture that is upright but not rigid."},
        {"text":"Lengthen the spine","duration":7,"phase":"focus","supportText":"A steady posture helps create a steady mind."},
        {"text":"Notice your breathing","duration":7,"phase":"inhale","supportText":"Use the breath as a stable point of return."},
        {"text":"Pick one point of focus","duration":8,"phase":"focus","supportText":"Choose a word, the breath, or the sensation in the chest."},
        {"text":"Stay with the anchor","duration":8,"phase":"hold","supportText":"Keep attention softly connected to that one point."},
        {"text":"Notice distractions","duration":7,"phase":"focus","supportText":"It is normal for the mind to wander."},
        {"text":"Label the distraction","duration":8,"phase":"focus","supportText":"Silently note it as a thought, memory, or feeling."},
        {"text":"Return to your anchor","duration":8,"phase":"exhale","supportText":"Coming back is the real training."},
        {"text":"Relax effort in the face","duration":7,"phase":"relax","supportText":"Focus works better when the body is not straining."},
        {"text":"Stay present","duration":8,"phase":"focus","supportText":"Only this breath, this seat, this moment."},
        {"text":"Strengthen calm attention","duration":9,"phase":"hold","supportText":"Notice how attention can become more stable with practice."},
        {"text":"Carry this clarity forward","duration":9,"phase":"focus","supportText":"Take the same calm focus into your next task."}
    ]'::jsonb
WHERE title = 'Focus Flow';

UPDATE meditations
SET
    description = 'A short but grounding anti-stress routine for fast emotional reset.',
    steps = '[
        {"text":"Take a deep breath","duration":6,"phase":"inhale","supportText":"Invite more space into the chest and ribs."},
        {"text":"Plant both feet","duration":6,"phase":"focus","supportText":"Feel the support under you and settle into it."},
        {"text":"Release your shoulders","duration":7,"phase":"exhale","supportText":"Let them fall away from the ears."},
        {"text":"Soften the hands","duration":6,"phase":"relax","supportText":"Uncurl the fingers and let the palms loosen."},
        {"text":"Notice where stress lives","duration":8,"phase":"focus","supportText":"Find the tightest place without trying to change it yet."},
        {"text":"Breathe into that tension","duration":8,"phase":"inhale","supportText":"Send breath gently toward the area that feels tight."},
        {"text":"Let go on the exhale","duration":9,"phase":"exhale","supportText":"Use the breath out to soften what you can."},
        {"text":"Relax the jaw and eyes","duration":7,"phase":"relax","supportText":"Stress often hides in the face first."},
        {"text":"Feel calm entering your body","duration":8,"phase":"inhale","supportText":"Imagine steadiness arriving with every breath in."},
        {"text":"Let go of the day","duration":8,"phase":"exhale","supportText":"You do not need to carry every pressure right now."},
        {"text":"Rest in a quieter state","duration":8,"phase":"hold","supportText":"Pause here and notice what feels lighter."},
        {"text":"Return with steadiness","duration":9,"phase":"focus","supportText":"Bring this calm into the next part of your day."}
    ]'::jsonb
WHERE title = 'Stress Relief';
