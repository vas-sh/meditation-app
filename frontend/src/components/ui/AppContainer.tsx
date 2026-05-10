import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";

export default function AppContainer({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1280,
        mx: "auto",
      }}
    >
      {children}
    </Box>
  );
}
