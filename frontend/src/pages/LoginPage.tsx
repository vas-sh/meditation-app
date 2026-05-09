import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Card sx={{ maxWidth: 520, boxShadow: "0 12px 28px rgba(47,111,100,0.12)" }}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h4">Login</Typography>
          <Typography color="text.secondary">
            This form is a UI mockup for the first stage of the coursework.
          </Typography>
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Box>
            <Button variant="contained" color="primary" sx={{ textTransform: "none" }}>
              Sign in
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
