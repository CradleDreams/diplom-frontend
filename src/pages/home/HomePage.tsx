import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import Portfolio from "./Portfolio";

export const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/preview");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "white",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: isMobile ? "2.5rem" : "4rem",
              textAlign: "center",
              mb: 2,
            }}
          >
            VideoViewer Pro
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: "center", maxWidth: "800px", mx: "auto", mb: 4 }}
          >
            Платформа для профессионального просмотра и анализа видео контента
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: "1.1rem",
                  borderRadius: "50px",
                  background:
                    "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                }}
              >
                Начать работу
              </Button>
            </motion.div>
          </Box>
        </motion.div>
        <Portfolio />
      </Container>
    </Box>
  );
};
