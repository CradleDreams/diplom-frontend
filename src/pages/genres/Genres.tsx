import React, { useEffect, useState } from "react";
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
import { genres } from "../../shared/lib/data/genresData";
import { PageContainer, GenreAccordion } from "./style";
import ViewVideoGenre from "./ui/ViewVideoGenre";
import CardVideoGenre from "./ui/CardVideoGenre";
import axios from "../../shared/api/axios";
import { IVideoFile } from "../../entities/video/model/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setUser } from "../../entities/user/model/userSlice";

export const Genres = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { genre: selectedGenre, videoId } = useParams();
  const [files, setFiles] = useState<IVideoFile[]>([]);
  const selectedVideo = files.find((file) => file._id === videoId);

  const [expanded, setExpanded] = useState<string | false>(
    selectedGenre || false,
  );
  // Используем жанры пользователя из Redux store
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const getFiles = async () => {
    try {
      const response = await axios.get(`/files/videos/user/${user?._id}`);
      setFiles(response.data);
    } catch (error: any) {
      console.log(error.response?.data?.message || "Failed to fetch files");
    }
  };

  const updateUser = async () => {
    try {
      if (!user) return;
      const response = await axios.put(`/user`, {
        _id: user?._id,
        genres: selectedGenres,
      });

      dispatch(setUser(response.data));
    } catch (error: any) {
      console.log(error.response?.data?.message || "Failed to fetch files");
    }
  };

  useEffect(() => {
    getFiles();
    if (user && user.genres) {
      setSelectedGenres(user.genres);
    }
  }, []);

  useEffect(() => {
    updateUser();
  }, [selectedGenres]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddGenre = (newGenre: string) => {
    if (!selectedGenres.includes(newGenre)) {
      setSelectedGenres([...selectedGenres, newGenre]);
      // Здесь можно добавить запрос на обновление жанров пользователя
      // updateUserGenres([...selectedGenres, newGenre]);
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    const updatedGenres = selectedGenres.filter((g) => g !== genreToRemove);
    setSelectedGenres(updatedGenres);
    // Здесь можно добавить запрос на обновление жанров пользователя
    // updateUserGenres(updatedGenres);
  };

  // Функция для получения видео по жанру
  const getVideosByGenre = (genre: string) => {
    return files.filter((file) => file.genre === genre);
  };

  // Доступные для добавления жанры (те, которых нет у пользователя)
  const availableGenres = genres.filter((g) => !selectedGenres.includes(g));

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
            Мои жанры
          </Typography>
        </motion.div>

        {videoId && selectedVideo ? (
          <ViewVideoGenre videoId={videoId} selectedVideo={selectedVideo} />
        ) : (
          <>
            <AnimatePresence>
              {selectedGenres.map((genreName) => {
                const genreVideos = getVideosByGenre(genreName);

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
                            <CardVideoGenre key={video._id} video={video} />
                          ))}
                        </Grid>
                      ) : (
                        <Typography>Нет видео в этом жанре</Typography>
                      )}
                    </AccordionDetails>
                  </GenreAccordion>
                );
              })}
            </AnimatePresence>

            {availableGenres.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "#00b4d8" }}
                >
                  Добавить жанр:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {availableGenres.map((genre) => (
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
            )}
          </>
        )}
      </Container>
    </PageContainer>
  );
};
