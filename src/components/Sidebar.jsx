import { GroupOutlined } from "@mui/icons-material";
import { alpha, Box, Icon, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizedDrawer from "./Drawer";

const HeaderMenu = ({ open, children }) => {
  if (!open) {
    return null;
  }
  return (
    <Typography
      fontWeight={500}
      fontSize={14}
      // paddingLeft={1.25}
      // width="100%"
      color="text.secondary"
      pb={1}
      sx={{ transition: "all 0.2s ease-in-out" }}
    >
      {children}
    </Typography>
  );
};

const ItemMenu = ({ open, active, icon, title, onClick }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      px={1.5}
      pl={open ? 2.5 : 1.5}
      width={open ? 215 : "auto"}
      height={45}
      minHeight={45}
      sx={{
        borderRadius: theme.shape.borderRadius,
        cursor: "pointer",
        backgroundColor: active
          ? alpha(theme.palette.secondary.main, 0.1)
          : "transparent",
        color: active ? theme.palette.secondary.main : "text.secondary",
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          color: theme.palette.secondary.main,
        },
        transition: "all 0.1s ease-in-out",
      }}
      onClick={onClick}
    >
      <Icon
        component={icon}
        fontSize={open ? "small" : "medium"}
        sx={{
          color: active ? theme.palette.secondary.main : "text.secondary",
        }}
      />
      {open && (
        <Typography
          fontWeight={400}
          fontSize={14}
          paddingLeft={2}
          // display={open ? "block" : "none"}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { open } = useSelector((state) => state.appbar);
  return (
    <CustomizedDrawer>
      <Stack
        direction="column"
        spacing={0.5}
        // width="100%"
        height="100%"
      >
        {/* APPLICATION ITEMS */}
        <HeaderMenu open={open}>Students</HeaderMenu>
        <ItemMenu
          open={open}
          icon={GroupOutlined}
          title="Students"
          active={location.pathname === "/students"}
          onClick={() => navigate("/students")}
        />
      </Stack>
    </CustomizedDrawer>
  );
}
