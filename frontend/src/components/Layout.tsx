import { Box, Container } from "@mui/material";
import type { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(226,240,235,1) 0%, rgba(247,245,240,1) 40%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {children}
      </Container>
    </Box>
  );
}
