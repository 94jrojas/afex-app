import { alpha, Box, useTheme } from "@mui/material";
import React from "react";

function Card({ children, border = true, borderColor, ...props }) {
  const theme = useTheme();
  return (
    <Box
      bgcolor={alpha("#fff", 0.03)}
      border={border ? 1 : 0}
      borderColor={borderColor || theme.palette.background.default}
      borderRadius={theme.shape.borderRadius}
      {...props}
    >
      {children}
    </Box>
  );
}

function CardHeader({ children, border = false, borderColor, ...props }) {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      borderBottom={border ? 1 : 0}
      borderColor={borderColor || theme.palette.background.default}
      {...props}
    >
      {children}
    </Box>
  );
}

function CardBody({
  children,
  height = "auto",
  maxHeight = "auto",
  border = false,
  borderColor,
  ...props
}) {
  const theme = useTheme();
  return (
    <Box
      display={props.flex ? "flex" : "block"}
      alignItems="center"
      borderTop={border || borderColor ? 1 : 0}
      borderBottom={border || borderColor ? 1 : 0}
      borderColor={borderColor || theme.palette.background.default}
      sx={{
        height: height,
        maxHeight: maxHeight,
        maxWidth: "100%",
        overflow: "auto",
        overflowY: "auto",
        // overflowX: "auto",
        "&::-webkit-scrollbar": {
          width: "0.4em",
          height: "0.4em",
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
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

function CardFooter({ children, border = false, borderColor, ...props }) {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      borderTop={border || borderColor ? 1 : 0}
      borderColor={borderColor || theme.palette.background.default}
      {...props}
    >
      {children}
    </Box>
  );
}

export { Card, CardHeader, CardBody, CardFooter };
