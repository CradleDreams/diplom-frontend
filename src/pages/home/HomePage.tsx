import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const portfolioItems = [
  {
    id: 1,
    title: "Кинематографичные пейзажи",
    description:
      "Серия видео в высоком разрешении с красивыми природными ландшафтами",
    image:
      "https://lesfm.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzhgxj6ko%2Fproduction%2F080307112ac876e3f5ce6ce0601b281aefb14fc2-3000x3000.jpg%3Fauto%3Dformat&w=640&q=75",
  },
  {
    id: 2,
    title: "Городские зарисовки",
    description: "Динамичные видео современных мегаполисов",
    image: "https://img.lovepik.com/photo/40007/7907.jpg_wh860.jpg",
  },
  {
    id: 3,
    title: "Макросъемка",
    description: "Удивительный мир в мельчайших деталях",
    image:
      "https://lh6.googleusercontent.com/proxy/lX-N0fWCoTfUkCxGBnw6UPQpqczaw94sfZngT0Cisrr9Djc1orJa1x4MaE7vj2_N-TScYL4zVEVWi-muGuXKz108xGDxFDREMBJYB-ho",
  },
  {
    id: 4,
    title: "Аэросъемка",
    description: "Захватывающие виды с высоты птичьего полета",
    image: "https://syomka-s-kvadrokoptera.ru/wp-content/uploads/2018/07/aerosemka1.jpg",
  },
];

export const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPortfolioIndex((prev) =>
        prev === portfolioItems.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        {/* Hero Section */}
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
            sx={{
              textAlign: "center",
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
            }}
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

        {/* Portfolio Section */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: 600,
            }}
          >
            Наши работы
          </Typography>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPortfolioIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={4} justifyContent="center">
                {[portfolioItems[currentPortfolioIndex]].map((item) => (
                  <Grid item xs={12} md={8} key={item.id}>
                    <Card
                      sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "translateY(-10px)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="400"
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent
                        sx={{
                          background:
                            "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                          color: "white",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="h3">
                          {item.title}
                        </Typography>
                        <Typography variant="body1">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              gap: 2,
            }}
          >
            {portfolioItems.map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <Box
                  onClick={() => setCurrentPortfolioIndex(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor:
                      currentPortfolioIndex === index
                        ? "primary.main"
                        : "grey.500",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
