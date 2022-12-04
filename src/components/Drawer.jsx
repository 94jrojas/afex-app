import { alpha, Box, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function CustomizedDrawer({ children }) {
  const theme = useTheme();
  const { open } = useSelector((state) => state.appbar);
  return (
    // Reserving space for the drawer
    <Box
      width={open ? 240 : 70}
      height="100%"
      sx={{
        overflow: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      {/* Drawer fixed position */}
      <Box
        display="flex"
        direction="column"
        position="fixed"
        width={open ? 240 : 70}
        height="100%"
        justifyContent="flex-start"
        backgroundColor={theme.palette.background.default}
        pt={0.25}
        pl={2}
        pr={1}
        sx={{
          zIndex: 10,
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.35em",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: 4,
          },
          "&:hover": {
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: alpha("#fff", 0.25),
            },
          },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
