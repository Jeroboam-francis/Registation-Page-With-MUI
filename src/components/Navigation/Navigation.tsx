import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Navigation = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box display="flex" gap={10} flexGrow={10}>
          <NavigationLink to="/registration" label="Registration" />
          <NavigationLink to="/" label="Home" />

          <NavigationLink to="/login" label="Login" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

interface NavigationLinkProps {
  to: string;
  label: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, label }) => {
  return (
    <Button
      color="inherit"
      component={NavLink}
      to={to}
      sx={{
        textTransform: "none",
        "&.active": {
          borderBottom: "2px solid white",
        },
      }}
    >
      {label}
    </Button>
  );
};
