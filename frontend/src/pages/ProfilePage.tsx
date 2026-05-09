import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function ProfilePage() {
  return (
    <Card sx={{ maxWidth: 640, boxShadow: "0 12px 28px rgba(47,111,100,0.12)" }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h4">Profile</Typography>
          <Typography color="text.secondary">
            This is a mock profile page. In the full version it can contain user data,
            favorite meditations and session history.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
