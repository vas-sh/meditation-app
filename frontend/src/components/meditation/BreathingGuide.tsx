import { Box, Stack, Typography } from "@mui/material";

export type BreathingStep = {
  text: string;
  duration: number;
  supportText?: string;
  phase?: "inhale" | "hold" | "exhale" | "steady" | "relax" | "focus";
};

type Props = {
  currentStep: BreathingStep;
};

function getScale(step: BreathingStep) {
  if (step.phase === "inhale") {
    return 1.18;
  }
  if (step.phase === "exhale") {
    return 0.86;
  }
  return 1;
}

export default function BreathingGuide({ currentStep }: Props) {
  const scale = getScale(currentStep);

  return (
    <Stack spacing={3} alignItems="center" textAlign="center">
      <Box
        sx={{
          width: { xs: 170, md: 220 },
          height: { xs: 170, md: 220 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(125,181,167,0.45) 45%, rgba(29,92,84,0.88) 100%)",
          boxShadow: "0 18px 54px rgba(29,92,84,0.24)",
          transform: `scale(${scale})`,
          transition: `transform ${currentStep.duration}s ease-in-out`,
        }}
      />
      <Stack spacing={0.5}>
        <Typography variant="h4">{currentStep.text}</Typography>
        <Typography color="text.secondary">
          {currentStep.supportText ?? "Follow the rhythm and let your breathing match the circle."}
        </Typography>
      </Stack>
    </Stack>
  );
}
