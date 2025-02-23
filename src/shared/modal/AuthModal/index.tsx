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

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
            />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Sign In
            </Button>
          </Box>
        ) : (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField fullWidth label="Name" margin="normal" required />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
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
