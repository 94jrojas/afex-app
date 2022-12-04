import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search,
} from "@mui/icons-material";

const CustomizedHeader = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center">
      <Box
        display={icon ? "flex" : "none"}
        mr={icon ? 1.5 : 0}
        color={theme.palette.secondary.main}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          }}
        >
          {/* <ItemIcon /> */}
          {icon}
        </Avatar>
      </Box>
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.text.secondary }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

const CustomizedSearchButton = ({ onClick = () => {} }) => {
  const theme = useTheme();
  return (
    <Tooltip title={"Search"}>
      <IconButton
        onClick={onClick}
        sx={{
          padding: 1,
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.palette.grey[700],
          },
        }}
      >
        <Search />
      </IconButton>
    </Tooltip>
  );
};

const CustomizedEditButton = ({ onClick = () => {} }) => {
  const theme = useTheme();
  return (
    <Tooltip title={"Edit"}>
      <IconButton
        onClick={onClick}
        sx={{
          padding: 1,
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.palette.grey[700],
          },
        }}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

const CustomizedDeleteButton = ({ onClick = () => {} }) => {
  const theme = useTheme();
  return (
    <Tooltip title={"Delete"}>
      <IconButton
        onClick={onClick}
        sx={{
          padding: 1,
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.palette.grey[700],
          },
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

const CustomizedAddButton = ({ onClick = () => {} }) => {
  const theme = useTheme();
  return (
    <Tooltip title={"Add"}>
      <IconButton
        onClick={onClick}
        sx={{
          padding: 1,
          backgroundColor: theme.palette.third.main,
          "&:hover": {
            backgroundColor: theme.palette.third.dark,
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};

const CustomizedBoxMessage = ({ message, ...props }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2}
      {...props}
    >
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

export {
  CustomizedHeader,
  CustomizedAddButton,
  CustomizedBoxMessage,
  CustomizedSearchButton,
  CustomizedEditButton,
  CustomizedDeleteButton,
};
