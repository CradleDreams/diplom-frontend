import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";

interface NavbarProps {
  onMenuClick?: () => void;
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onMenuClick,
  isAuthenticated,
  onLogin,
  onLogout,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <IconButton
            component={Link}
            to="/"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
          >
            <MovieCreationIcon fontSize="large" />
          </IconButton>

          <Typography variant="h6" component="div">
            VideoViewer
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {!isMobile && (
            <>
              <Button
                component={Link}
                to="/preview"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Preview
              </Button>

              <Button
                component={Link}
                to="/genres"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Genres
              </Button>
            </>
          )}

          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={onLogout}
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={onLogin}
              sx={{ textTransform: "none" }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
