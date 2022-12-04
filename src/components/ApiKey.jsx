import { alpha, Box, Typography, useTheme } from "@mui/material";
import React from "react";

export default function ApiKey() {
  const theme = useTheme();
  const apiKey = process.env.REACT_APP_API_KEY || "API_KEY";
  return (
    <React.Fragment>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        sx={{
          border: "1px solid",
          borderColor: theme.palette.divider,
          borderRadius: theme.shape.borderRadius,
          height: 70,
          width: 500,
          maxWidth: 500,
          cursor: "pointer",
          transition: "all 0.1s ease-in-out",
          "&:hover": {
            backgroundColor: alpha("#fff", 0.07),
          },
        }}
      >
        <Box>
          <Typography variant="h6">API KEY</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {apiKey}
          </Typography>
        </Box>
        <Box />
      </Box>
    </React.Fragment>
  );
}
