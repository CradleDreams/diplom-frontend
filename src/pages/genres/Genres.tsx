import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import { genresData } from "../../shared/lib/data/genresData";
import { PageContainer, GenreAccordion } from "./style";
import ViewVideoGenre from "./ui/ViewVideoGenre";
import CardVideoGenre from "./ui/CardVideoGenre";

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

  const [expanded, setExpanded] = useState<string | false>(
    selectedGenre || false,
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    genresData.slice(0, 3).map((g) => g.genre),
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
          <ViewVideoGenre videoId={videoId} selectedVideo={selectedVideo} />
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
                        "&:hover": { bgcolor: "rgba(0, 180, 216, 0.15)" },
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
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
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
                            <CardVideoGenre video={video} />
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
                sx={{ fontWeight: 600, color: "#00b4d8" }}
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
                          "&:hover": { background: "rgba(0, 180, 216, 0.3)" },
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
