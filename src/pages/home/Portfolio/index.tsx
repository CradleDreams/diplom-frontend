import { Typography, Card,Grid, CardMedia, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioItems } from "../../../shared/lib/data/portfolioItems";
import { useState, useEffect } from "react";

const Portfolio = () => {
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPortfolioIndex((prev) =>
        prev === portfolioItems.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
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
                    <Typography variant="body1">{item.description}</Typography>
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
                  currentPortfolioIndex === index ? "primary.main" : "grey.500",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Portfolio;
