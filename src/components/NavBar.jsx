import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { colors } from "../styles/colors";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

export default function NavAppBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [navConfig, setNavConfig] = React.useState(null);


    // Charger le fichier JSON
    React.useEffect(() => {
        fetch("/profile/navbar.config.json")
            .then((res) => res.json())
            .then((data) => setNavConfig(data))
            .catch((err) => console.error("Erreur chargement navbar:", err));
    }, []);

    if (!navConfig) return null; // ou loader

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "start" }}>
            <Box sx={{ my: 2 }}>
                <img
                    src={navConfig.logo.source}
                    height={navConfig.logo.height}
                    width={navConfig.logo.width}
                    alt="logo"
                />
            </Box>

            <List>
                {navConfig.sections.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={item.href}
                            // target={item.type === "link" ? "_blank" : "_self"}
                        >
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", backgroundColor: colors.background }}>
            <CssBaseline />

            <AppBar component="nav" sx={{ backgroundColor: colors.background }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: "none" }, mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}>
                        <img
                            src={navConfig.logo.source}
                            height={navConfig.logo.height}
                            alt="logo"
                        />
                    </Box>

                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {navConfig.sections.map((item) => (
                            <Button
                                component={NavLink}
                                to={item.href}
                                sx={{
                                    color: colors.textLight,
                                    borderBottom: "2px solid transparent",
                                    borderRadius: 0,
                                    '&.active': {
                                        color: colors.primary,
                                        borderBottom: `2px solid ${colors.primary}`,
                                        fontWeight: "bold",
                                    },
                                    '&:hover': {
                                        color: colors.primary,
                                    },
                                }}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { width: drawerWidth }
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
