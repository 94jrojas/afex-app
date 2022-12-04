import { Box, Dialog, useTheme } from "@mui/material";
import React from "react";

const PaperComponent = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      p={0}
      borderRadius={theme.shape.borderRadius}
      bgcolor={theme.palette.background.paperLight}
      color={theme.palette.text.primary}
      {...props}
    >
      {children}
    </Box>
  );
};

export default function CustomizedDialog({
  open,
  onClose = () => {},
  maxWidth = "sm",
  children,
  ...props
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperComponent={PaperComponent}
      {...props}
    >
      {children}
    </Dialog>
  );
}
