import React from "react";
import NavAppBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { colors } from "../styles/colors";
import { Box } from "@mui/material";
const Layout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
      }}
    >
      <NavAppBar />
      <main
      >
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
