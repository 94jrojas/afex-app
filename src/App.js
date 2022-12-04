// Import Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import theme from "./themes/darkMode";

// import "ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "./components/AppBar";
import Sidebar from "./components/Sidebar";
import CustomizedToastContainer from "./components/ToastContainer";
import Students from "./pages/students";

const CustomizedApp = ({ children }) => {
  return (
    <>
      <AppBar />
      <Box display="flex" minHeight="calc(100vh - 80px)">
        <Sidebar />
        <Box
          component="main"
          flex={12}
          pl={1}
          pr={2}
          pt={0.25}
          pb={1}
        >
          <Box
            height="100%"
            width="100%"
            bgcolor={theme.palette.background.paperLight}
            borderRadius={theme.shape.borderRadius}
            p={2}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};


function App() {
  return (    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomizedToastContainer />
        <CustomizedApp>
          <Routes>
            <Route index element={<Navigate to={"students"} />} />
            <Route path="students" element={<Students />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </CustomizedApp>
      </ThemeProvider>    
  );
}

export default App;
