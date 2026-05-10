import AirRoundedIcon from "@mui/icons-material/AirRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export type MeditationItem = {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  description?: string;
  createdAt?: string;
};

type Props = {
  meditation: MeditationItem;
};

const categoryMeta: Record<string, { icon: JSX.Element; caption: string; accent: string }> = {
  relaxation: {
    icon: <SpaRoundedIcon fontSize="small" />,
    caption: "Gentle relaxation for body and mind",
    accent: "linear-gradient(135deg, rgba(29,92,84,0.12), rgba(125,181,167,0.18))",
  },
  focus: {
    icon: <PsychologyAltRoundedIcon fontSize="small" />,
    caption: "Sharpen concentration and mental clarity",
    accent: "linear-gradient(135deg, rgba(56,91,139,0.12), rgba(120,165,220,0.18))",
  },
  sleep: {
    icon: <DarkModeRoundedIcon fontSize="small" />,
    caption: "Ease into a slower, sleep-ready state",
    accent: "linear-gradient(135deg, rgba(64,68,124,0.12), rgba(145,149,224,0.18))",
  },
  stress: {
    icon: <SpaRoundedIcon fontSize="small" />,
    caption: "Reset and release built-up tension",
    accent: "linear-gradient(135deg, rgba(151,106,68,0.12), rgba(233,176,109,0.18))",
  },
  breathing: {
    icon: <AirRoundedIcon fontSize="small" />,
    caption: "Use breathwork to reset your rhythm",
    accent: "linear-gradient(135deg, rgba(33,108,116,0.12), rgba(99,186,194,0.18))",
  },
};

export default function MeditationCard({ meditation }: Props) {
  const meta = categoryMeta[meditation.category] ?? categoryMeta.relaxation;

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid rgba(29,92,84,0.08)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(241,248,246,0.9))",
        boxShadow: "0 18px 36px rgba(29,92,84,0.10)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 24px 44px rgba(29,92,84,0.16)",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Chip label={meditation.category} color="primary" variant="outlined" />
          <Typography color="text.secondary">{meditation.durationMinutes} min</Typography>
        </Stack>

        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "16px",
            display: "grid",
            placeItems: "center",
            background: meta.accent,
            color: "primary.main",
            mb: 2,
          }}
        >
          {meta.icon}
        </Box>

        <Typography variant="h6" gutterBottom>
          {meditation.title}
        </Typography>

        <Typography color="text.secondary">
          {meditation.description ?? "Simple mock meditation description for the demo UI."}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
        <Typography variant="caption" color="text.secondary">
          {meta.caption}
        </Typography>
        <Button
          component={Link}
          to={`/meditations/${meditation.id}`}
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
}
