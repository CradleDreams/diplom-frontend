import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
  Typography,
  Alert,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "90vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
};

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  error?: string;
  onSignIn: (e: React.FormEvent) => Promise<void>;
  onSignUp: (e: React.FormEvent) => Promise<void>;
  signInEmail: string;
  setSignInEmail: (value: string) => void;
  signInPassword: string;
  setSignInPassword: (value: string) => void;
  signUpName: string;
  setSignUpName: (value: string) => void;
  signUpEmail: string;
  setSignUpEmail: (value: string) => void;
  signUpPassword: string;
  setSignUpPassword: (value: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onClose,
  error,
  onSignIn,
  onSignUp,
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
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="auth-modal-title">
      <Box sx={modalStyle}>
        <Box sx={{ bgcolor: "primary.main", p: 2 }}>
          <Typography variant="h6" color="white" textAlign="center">
            VideoViewer
          </Typography>
        </Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mx: 2, mt: 1 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ p: 3 }}>
          {tabValue === 0 ? (
            <Box component="form" onSubmit={onSignIn}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                required
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                required
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
              >
                Sign In
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={onSignUp}>
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                required
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                required
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                required
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
