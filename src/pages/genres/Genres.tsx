import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
  styled,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import { genresData } from "../../features/genres/lib/genresData";

// Стилизованные компоненты
const PageContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  color: "white",
});

const GenreAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: "12px !important",
  overflow: "hidden",
  marginBottom: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: theme.spacing(2, 0),
  },
}));

const VideoCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "all 0.3s ease",
  background: "rgba(255, 255, 255, 0.05)",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 10px 25px rgba(0, 150, 255, 0.3)",
    border: "1px solid rgba(0, 150, 255, 0.5)",
  },
});

// Все доступные жанры (основные + 8 дополнительных)
const allGenres = [
  ...genresData.map((g) => g.genre),
  "Фантастика",
  "Боевик",
  "Мелодрама",
  "Детектив",
  "Вестерн",
  "Мюзикл",
  "Биография",
  "Спорт",
];

export const Genres = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { genre: selectedGenre, videoId } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | false>(
    selectedGenre || false
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    genresData.slice(0, 3).map((g) => g.genre)
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddGenre = (newGenre: string) => {
    if (!selectedGenres.includes(newGenre)) {
      setSelectedGenres([...selectedGenres, newGenre]);
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genreToRemove));
  };

  const handleVideoClick = (videoId: string) => {
    // Находим жанр, к которому принадлежит видео
    const videoGenre =
      genresData.find((genre) =>
        genre.videos.some((video) => video.id.toString() === videoId)
      )?.genre || "";

    navigate(`/genres/${videoGenre}/${videoId}`);
  };

  const selectedVideo = genresData
    .flatMap((g) => g.videos)
    .find((v) => v.id.toString() === videoId);

  return (
    <PageContainer>
      <Container maxWidth="lg" sx={{ py: 4, px: isMobile ? 2 : 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              mb: 4,
              fontWeight: 700,
              color: "#00b4d8",
              textAlign: "center",
            }}
          >
            Все жанры
          </Typography>
        </motion.div>

        {videoId && selectedVideo ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  maxWidth: 800,
                  width: "100%",
                  boxShadow: "0 10px 30px rgba(0, 180, 216, 0.3)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "rgba(20, 20, 30, 0.9)",
                  color: "white",
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={selectedVideo.image}
                  alt={selectedVideo.title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      color: "#00b4d8",
                    }}
                  >
                    {selectedVideo.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, display: "flex", alignItems: "center" }}
                  >
                    Длительность:{" "}
                    <Box component="span" sx={{ ml: 1, fontWeight: 500 }}>
                      {selectedVideo.duration}
                    </Box>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedVideo.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background: "linear-gradient(45deg, #00b4d8, #0077b6)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #0077b6, #00b4d8)",
                      },
                    }}
                    onClick={() => navigate(`/preview?videoId=${videoId}`)}
                  >
                    Смотреть видео
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      ml: 2,
                      color: "#00b4d8",
                      borderColor: "#00b4d8",
                      "&:hover": {
                        borderColor: "#00b4d8",
                      },
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Назад к списку
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        ) : (
          <>
            <AnimatePresence>
              {selectedGenres.map((genreName) => {
                const genreData = genresData.find((g) => g.genre === genreName);
                const genreVideos = genreData?.videos || [];

                return (
                  <GenreAccordion
                    key={genreName}
                    expanded={expanded === genreName}
                    onChange={handleChange(genreName)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#00b4d8" }} />}
                      sx={{
                        bgcolor: "rgba(0, 180, 216, 0.1)",
                        "&:hover": {
                          bgcolor: "rgba(0, 180, 216, 0.15)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {genreName}
                        </Typography>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveGenre(genreName);
                          }}
                          sx={{ color: "#00b4d8" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {genreVideos.length > 0 ? (
                        <Grid container spacing={3}>
                          {genreVideos.map((video) => (
                            <Grid item xs={12} sm={6} md={4} key={video.id}>
                              <motion.div
                                whileHover={{ y: -8 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <VideoCard
                                  onClick={() =>
                                    handleVideoClick(video.id.toString())
                                  }
                                >
                                  <CardMedia
                                    component="img"
                                    height="200"
                                    image={video.image}
                                    alt={video.title}
                                    sx={{
                                      borderBottom: "2px solid #00b4d8",
                                    }}
                                  />
                                  <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      sx={{
                                        fontWeight: 600,
                                      }}
                                    >
                                      {video.title}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "rgba(255,255,255,0.7)" }}
                                    >
                                      {video.duration}
                                    </Typography>
                                  </CardContent>
                                </VideoCard>
                              </motion.div>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Typography>
                          Нет доступных видео в этом жанре
                        </Typography>
                      )}
                    </AccordionDetails>
                  </GenreAccordion>
                );
              })}
            </AnimatePresence>

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#00b4d8",
                }}
              >
                Добавить жанр:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {allGenres
                  .filter((g) => !selectedGenres.includes(g))
                  .map((genre) => (
                    <motion.div
                      key={genre}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Chip
                        label={genre}
                        onClick={() => handleAddGenre(genre)}
                        icon={<AddIcon />}
                        sx={{
                          cursor: "pointer",
                          background: "rgba(0, 180, 216, 0.2)",
                          color: "white",
                          "&:hover": {
                            background: "rgba(0, 180, 216, 0.3)",
                          },
                        }}
                      />
                    </motion.div>
                  ))}
              </Box>
            </Box>
          </>
        )}
      </Container>
    </PageContainer>
  );
};
