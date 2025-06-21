import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, ListItem } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BusinessIcon from '@mui/icons-material/Business';
import BuildIcon from '@mui/icons-material/Build';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useLocation } from "react-router-dom";
import { useCustomTheme } from "../../context/ThemeContext";

const drawerWidth = 220;

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Przychody", icon: <TrendingUpIcon />, path: "/revenues" },
  { text: "Wydatki", icon: <ReceiptIcon />, path: "/expenses" },
  { text: "Transakcje", icon: <SwapHorizIcon />, path: "/transactions" },
  { text: "Faktury", icon: <ReceiptIcon />, path: "/invoices" },
  { text: "Kontrahenci", icon: <BusinessIcon />, path: "/contractors" },
  { text: "Usługi", icon: <BuildIcon />, path: "/services" },
];

const Sidebar = () => {
  const location = useLocation();
  const { mode, toggleMode } = useCustomTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleMode}>
            <ListItemIcon>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </ListItemIcon>
            <ListItemText primary={mode === "light" ? "Ciemny motyw" : "Jasny motyw"} />
          </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{ borderRadius: 2, m: 1 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
