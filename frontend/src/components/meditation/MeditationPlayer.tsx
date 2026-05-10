import AirRoundedIcon from "@mui/icons-material/AirRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LinearProgress from "@mui/material/LinearProgress";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import { Alert, Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import BreathingGuide, { type BreathingStep } from "./BreathingGuide";
import { findMeditationScenario } from "../../data/meditations";

type Props = {
  meditationId: string;
  meditationTitle: string;
  category: string;
  durationMinutes: number;
  onClose: () => void;
  onSaveSession: (meditationId: string, durationMinutes: number) => Promise<void>;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export default function MeditationPlayer({
  meditationId,
  meditationTitle,
  category,
  durationMinutes,
  onClose,
  onSaveSession,
}: Props) {
  const scenario = findMeditationScenario(meditationTitle, category);
  const iconByCategory: Record<string, JSX.Element> = {
    breathing: <AirRoundedIcon fontSize="small" />,
    relaxation: <SpaRoundedIcon fontSize="small" />,
    focus: <PsychologyAltRoundedIcon fontSize="small" />,
    sleep: <DarkModeRoundedIcon fontSize="small" />,
    stress: <AccessibilityNewRoundedIcon fontSize="small" />,
  };
  const program = {
    label:
      scenario.category === "sleep"
        ? "Sleep wind-down"
        : scenario.category === "focus"
          ? "Focus training"
          : scenario.category === "stress"
            ? "Stress reset"
            : scenario.category === "breathing"
              ? "Breath rhythm"
              : "Relaxation flow",
    intro: scenario.description,
    icon: iconByCategory[scenario.category] ?? <SpaRoundedIcon fontSize="small" />,
    steps: scenario.steps,
  };
  const totalSeconds = durationMinutes * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  useEffect(() => {
    if (!isRunning || isCompleted) {
      return;
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setIsRunning(false);
          setIsCompleted(true);
          return 0;
        }
        return current - 1;
      });

      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, isCompleted]);

  const sessionTimeline = useMemo(() => {
    const baseTotal = program.steps.reduce((sum, step) => sum + step.duration, 0);
    const scaledTimeline = program.steps.map((step) => {
      const rawDuration = Math.round((step.duration / baseTotal) * totalSeconds);
      return {
        ...step,
        sessionDuration: Math.max(1, rawDuration),
      };
    });

    const assigned = scaledTimeline.reduce((sum, step) => sum + step.sessionDuration, 0);
    const difference = totalSeconds - assigned;

    if (scaledTimeline.length > 0 && difference !== 0) {
      const lastIndex = scaledTimeline.length - 1;
      scaledTimeline[lastIndex] = {
        ...scaledTimeline[lastIndex],
        sessionDuration: Math.max(1, scaledTimeline[lastIndex].sessionDuration + difference),
      };
    }

    return scaledTimeline;
  }, [program.steps, totalSeconds]);

  const currentStep = useMemo(() => {
    let progress = 0;
    for (const step of sessionTimeline) {
      progress += step.sessionDuration;
      if (elapsedSeconds < progress) {
        return step;
      }
    }

    return sessionTimeline[sessionTimeline.length - 1] ?? program.steps[0];
  }, [elapsedSeconds, program.steps, sessionTimeline]);

  const currentStepIndex = useMemo(() => {
    return sessionTimeline.findIndex((step) => step.text === currentStep.text && step.supportText === currentStep.supportText);
  }, [currentStep, sessionTimeline]);

  const progressPercent = totalSeconds === 0 ? 0 : (elapsedSeconds / totalSeconds) * 100;

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setRemainingSeconds(totalSeconds);
    setElapsedSeconds(0);
    setSaveError("");
    setSaveSuccess("");
  };

  const handleSaveSession = async () => {
    setSaveError("");
    setSaveSuccess("");
    setIsSaving(true);

    try {
      await onSaveSession(meditationId, durationMinutes);
      setSaveSuccess("Session saved successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save session";
      setSaveError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 8,
        border: "1px solid rgba(29,92,84,0.10)",
        background: "linear-gradient(180deg, rgba(16,39,37,0.96), rgba(29,92,84,0.92))",
        color: "white",
        boxShadow: "0 28px 56px rgba(12,34,31,0.28)",
      }}
    >
      {!isCompleted ? (
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Stack spacing={1}>
            <Chip
              icon={program.icon}
              label={program.label}
              variant="outlined"
              sx={{
                alignSelf: "center",
                color: "white",
                borderColor: "rgba(255,255,255,0.26)",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
            <Typography variant="h4">{meditationTitle}</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
              {program.intro}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.58)" }}>
              This session unfolds step by step across the full timer.
            </Typography>
          </Stack>

          <Stack spacing={1.25} sx={{ width: "100%", maxWidth: 640 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.72)" }}>
              <Typography variant="caption">
                Step {Math.max(1, currentStepIndex + 1)} of {sessionTimeline.length}
              </Typography>
              <Typography variant="caption">{Math.round(progressPercent)}% complete</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{
                height: 10,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.12)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #e9b06d, #8ed4c0)",
                },
              }}
            />
          </Stack>

          <Typography variant="h1" sx={{ fontSize: { xs: "3.4rem", md: "5rem" }, lineHeight: 1 }}>
            {formatTime(remainingSeconds)}
          </Typography>

          <BreathingGuide currentStep={currentStep} />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsRunning(true)}
              disabled={isRunning}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Start
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsRunning(false)}
              disabled={!isRunning}
              sx={{ textTransform: "none", fontWeight: 700, color: "white", borderColor: "rgba(255,255,255,0.38)" }}
            >
              Pause
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{ textTransform: "none", fontWeight: 700, color: "white", borderColor: "rgba(255,255,255,0.38)" }}
            >
              Reset
            </Button>
            <Button
              variant="text"
              onClick={onClose}
              sx={{ textTransform: "none", fontWeight: 700, color: "rgba(255,255,255,0.86)" }}
            >
              Exit
            </Button>
          </Box>
        </Stack>
      ) : (
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography variant="h3">Meditation completed</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.76)" }}>
            You completed {durationMinutes} minute{durationMinutes === 1 ? "" : "s"} of practice.
          </Typography>
          {saveSuccess && <Alert severity="success">{saveSuccess}</Alert>}
          {saveError && <Alert severity="error">{saveError}</Alert>}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveSession}
              disabled={isSaving}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Save Session
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{ textTransform: "none", fontWeight: 700, color: "white", borderColor: "rgba(255,255,255,0.38)" }}
            >
              Practice Again
            </Button>
            <Button
              variant="text"
              onClick={onClose}
              sx={{ textTransform: "none", fontWeight: 700, color: "rgba(255,255,255,0.86)" }}
            >
              Back to Details
            </Button>
          </Box>
        </Stack>
      )}
    </Paper>
  );
}
