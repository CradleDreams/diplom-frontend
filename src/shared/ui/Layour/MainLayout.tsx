import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
  CssBaseline,
} from "@mui/material";
import { Footer } from "../../../widgets/footer/Footer";
import { useAuth } from "../../../features/auth/lib/useAuth";
import { AuthModal } from "../../../widgets/auth-modal/AuthModal";
import { Header } from "../../../widgets/header/Header";

const drawerWidth = 240;

export const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    user,
    logout,
    signInEmail,
    setSignInEmail,
    signInPassword,
    setSignInPassword,
    signUpName,
    setSignUpName,
    signUpEmail,
    setSignUpEmail,
    signUpPassword,
    setSignUpPassword,
    login,
    register,
  } = useAuth();

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginClick = () => {
    setAuthModalOpen(true);
    setAuthError("");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await login(signInEmail, signInPassword);
      if (success) {
        setAuthModalOpen(false);
      } else {
        setAuthError("Invalid email or password");
      }
    } catch (error) {
      setAuthError("Login failed");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await register(signUpName, signUpEmail, signUpPassword);
      if (success) {
        setAuthModalOpen(false);
      } else {
        setAuthError("Registration failed. Please try again.");
      }
    } catch (error) {
      setAuthError("Registration failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <CssBaseline />
      <Header
        onMenuClick={handleDrawerToggle}
        isAuthenticated={!!user}
        onLogin={handleLoginClick}
        onLogout={handleLogout}
      />

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          {/* Мобильное меню */}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          p: 0,
          marginTop: "64px",
        }}
      >
        <Outlet />
      </Box>

      <Footer />

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        error={authError}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        signInEmail={signInEmail}
        setSignInEmail={setSignInEmail}
        signInPassword={signInPassword}
        setSignInPassword={setSignInPassword}
        signUpName={signUpName}
        setSignUpName={setSignUpName}
        signUpEmail={signUpEmail}
        setSignUpEmail={setSignUpEmail}
        signUpPassword={signUpPassword}
        setSignUpPassword={setSignUpPassword}
      />
    </Box>
  );
};
