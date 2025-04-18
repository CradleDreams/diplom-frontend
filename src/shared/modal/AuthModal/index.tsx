import * as React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { createUser, getUser } from "../../../redux/userSlice";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [tabValue, setTabValue] = React.useState(0);

  // Состояния для Sign In
  const [signInEmail, setSignInEmail] = React.useState("");
  const [signInPassword, setSignInPassword] = React.useState("");

  // Состояния для Sign Up
  const [signUpName, setSignUpName] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSignInSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      getUser({
        username: signUpName,
        password: signUpPassword,
      })
    );
    onClose();
  };

  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      createUser({
        username: signUpName,
        email: signUpEmail,
        password: signUpPassword,
        genres: [],
      })
    );
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <Divider sx={{ my: 2 }} />
        {tabValue === 0 ? (
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSignInSubmit}>
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
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Sign In
            </Button>
          </Box>
        ) : (
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSignUpSubmit}>
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
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Sign Up
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
