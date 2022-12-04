import {
  Info as InfoIcon,
  CheckTwoTone as SuccessIcon,
  Close as ErrorIcon,
  PriorityHigh as WarningIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
// import styled from "styled-components";

export default function CustomizedToastContainer() {
  const theme = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeButton={false}
      className="toastify-container"
      theme="light"
      pauseOnFocusLoss={false}
      icon={({ type }) => {
        switch (type) {
          case "info":
            return (
              <InfoIcon
                fontSize="large"
                sx={{ color: theme.palette.secondary.main }}
              />
            );
          case "success":
            return (
              <SuccessIcon
                fontSize="large"
                sx={{ color: theme.palette.success.main }}
              />
            );
          case "error":
            return (
              <ErrorIcon
                fontSize="large"
                sx={{ color: theme.palette.error.main }}
              />
            );
          case "warning":
            return (
              <WarningIcon
                fontSize="large"
                sx={{ color: theme.palette.warning.main }}
              />
            );
          default:
            return null;
        }
      }}
      style={{
        // boxshadow: "0 0 10px rgba(0, 0, 0, 0.1)",

        "--toastify-color-light": theme.palette.background.paperDark,
        "--toastify-color-dark": theme.palette.background.paper,

        "--toastify-text-color-light": theme.palette.text.primary,
        "--toastify-text-color-dark": theme.palette.text.primary,

        "--toastify-color-progress-info": theme.palette.secondary.main,
        "--toastify-color-progress-success": theme.palette.success.main,
        "--toastify-color-progress-warning": theme.palette.warning.main,
        "--toastify-color-progress-error": theme.palette.error.main,

        // icon width
        "--toastify-icon": {
          width: "50px",
        },
      }}
    />
  );
}
