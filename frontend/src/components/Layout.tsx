import { Box, Container } from "@mui/material";
import type { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(130,194,175,0.28), transparent 28%), radial-gradient(circle at top right, rgba(233,176,109,0.18), transparent 26%), linear-gradient(180deg, #eef4f1 0%, #f6f0e8 46%, #ffffff 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "auto -120px 60px auto",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(29,92,84,0.08)",
          filter: "blur(12px)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: "110px auto auto -100px",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(233,176,109,0.16)",
          filter: "blur(10px)",
        },
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, position: "relative", zIndex: 1 }}>
        {children}
      </Container>
    </Box>
  );
}
