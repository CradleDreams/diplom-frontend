import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        color: "text.secondary",
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ x: 5 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                VideoViewer
              </Typography>
            </motion.div>
            <Typography variant="body2">
              Профессиональная платформа для работы с видео
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ x: 5 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Навигация
              </Typography>
            </motion.div>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/" color="inherit" underline="hover">
                  Главная
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/preview" color="inherit" underline="hover">
                  Превью
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/genres" color="inherit" underline="hover">
                  Жанры
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/analytics" color="inherit" underline="hover">
                  Аналитика
                </Link>
              </motion.li>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ x: 5 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Контакты
              </Typography>
            </motion.div>
            <Typography variant="body2">Email: info@videoviewer.com</Typography>
            <Typography variant="body2">Телефон: +7 (123) 456-7890</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ x: 5 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Соцсети
              </Typography>
            </motion.div>
            <Box sx={{ display: "flex", gap: 2 }}>
              {["Facebook", "Twitter", "Instagram"].map((social) => (
                <motion.div
                  key={social}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="#" color="inherit" underline="hover">
                    {social}
                  </Link>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} VideoViewer. Все права защищены.
        </Typography>
      </Container>
    </Box>
  );
};
