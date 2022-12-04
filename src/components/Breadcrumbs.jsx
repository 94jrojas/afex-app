import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Breadcrumbs({ ...props }) {
  const location = useLocation();
  const paths = location.pathname.split("/").slice(1);
  const theme = useTheme();
  const navigate = useNavigate();
  const lastPath = paths[paths.length - 1] || "";
  const title = lastPath.charAt(0).toUpperCase() + lastPath.slice(1);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor={theme.palette.background.default}
      p={2}
      borderRadius={theme.shape.borderRadius}
      {...props}
    >
      <Typography
        variant="span"
        fontWeight={500}
        fontSize={18}
        sx={{ display: "block" }}
      >
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        color={theme.palette.text.breadcrumb}
      >
        <HomeIcon
          fontSize="small"
          sx={{ cursor: "pointer", color: theme.palette.secondary.main }}
        />
        <NavigateNextIcon fontSize="small" />
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <Typography
              variant="span"
              fontWeight={500}
              fontSize={14}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/${paths.slice(0, index + 1).join("/")}`);
              }}
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Typography>
            {index < paths.length - 1 && <NavigateNextIcon fontSize="small" />}
          </React.Fragment>
        ))}
        {/* <Typography>{title}</Typography> */}
      </Stack>
    </Stack>
  );
}
