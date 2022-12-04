import { alpha, Box, IconButton, useTheme } from "@mui/material";
import ApiKey from "./ApiKey";
import { Menu as MenuIcon } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { appbarSlice } from "../store/slices/appbar";

// Logo and toggle button for the appbar drawer.
const AppHeader = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleToggle = () => dispatch(appbarSlice.actions.toggleSidebar());

  return (
    <React.Fragment>
      <Box
        display="flex"
        alignItems="center"
        height="100%"
        sx={{ cursor: "pointer" }}
        // onClick={() => navigate("/")}
      >
        <img src="/logo-afex.svg" alt="AFEX" width="auto" height="40px" />
      </Box>
      <IconButton
        size="large"
        edge="start"
        aria-label="open drawer"
        onClick={handleToggle}
        sx={{
          color: theme.palette.primary.main,
          borderRadius: theme.shape.borderRadius,
          padding: 0.5,
          backgroundColor: alpha("#fff", 0.05),
          transition: "all 0.1s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default function AppBar() {
  return (
    // Reserving space for the sidebar
    <Box minHeight={80} height={80}>
      {/* AppBar fixed position */}
      <Box
        display="flex"
        position="fixed"
        minHeight={80}
        height={80}
        width={"100%"}
        alignItems="center"
        // backgroundColor={theme.palette.background.default}
        backgroundColor={"transparent"}
        sx={{ zIndex: 10 }}
      >
        <Box
          width={240}
          minWidth={240}
          maxWidth={240}
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={2}
          pr={1}
        >
          <AppHeader />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          pl={1}
          pr={2}
        >
          <ApiKey />
          <Box />
        </Box>
      </Box>
    </Box>
  );
}
