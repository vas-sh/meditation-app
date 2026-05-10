import { Chip, Paper, Stack, Typography } from "@mui/material";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
};

export default function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 5,
        border: "1px solid rgba(29,92,84,0.08)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(237,245,242,0.75))",
        backdropFilter: "blur(10px)",
        boxShadow: "0 18px 36px rgba(29,92,84,0.08)",
      }}
    >
      <Stack spacing={1.5}>
        {eyebrow && (
          <Chip
            label={eyebrow}
            color="primary"
            variant="outlined"
            sx={{ alignSelf: "flex-start", fontWeight: 700 }}
          />
        )}
        <Typography variant="h4">{title}</Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>
    </Paper>
  );
}
