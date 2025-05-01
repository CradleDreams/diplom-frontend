import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
  InputAdornment,
  Fade,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { genresData } from "../../shared/lib/data/genresData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { createFile } from "../../entities/video/model/videoSlice";
import { MoviesBackground, ContentBox, StyledCard } from "./style";
import LoadingCircle from "./ui/LoadingCircle";
import ViewVideoGenre from "./ui/ViewVideoGenre";
import ViewVideoPreview from "./ui/ViewVideoPreview";
import axios from "../../shared/api/axios";
import { IVideoFile } from "../../entities/video/model/types";

const Preview = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const videoId = searchParams.get("videoId");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { file } = useSelector((state: RootState) => state.video);

  const [videoData, setVideoData] = useState<IVideoFile>();
  const [videoUrl, setVideoUrl] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFile = async () => {
    try {
      const response = await axios.get(`/files/video/${videoId}`);
      setVideoData(response.data);
    } catch (error: any) {
      console.log(error.response?.data?.message || "Failed to fetch files");
    }
  };

  useEffect(() => {
    if (videoId) {
      getFile();
    }
  }, [videoId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user && videoUrl) {
      console.log("1", user);

      await dispatch(createFile({ sourceUrl: videoUrl, userId: user._id }));
      setShowPlayer(true);
    }
  };

  const handleReset = () => {
    setShowPlayer(false);
    setVideoUrl("");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Режим просмотра конкретного видео
  if (videoId) {
    return (
      <MoviesBackground>
        <Container maxWidth="md">
          <ContentBox>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
                py: 4,
              }}
            >
              <StyledCard>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {!videoData ? (
                    <LoadingCircle />
                  ) : (
                    <ViewVideoGenre video={videoData} handleBack={handleBack} />
                  )}
                </CardContent>
              </StyledCard>
            </Box>
          </ContentBox>
        </Container>
      </MoviesBackground>
    );
  }

  // Режим ввода ссылки (если videoId нет)
  return (
    <MoviesBackground>
      <Container maxWidth="md">
        <ContentBox>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh",
              py: 4,
            }}
          >
            {!showPlayer ? (
              <Fade in={!showPlayer} timeout={800}>
                <Box sx={{ textAlign: "center", mb: 4, px: 2 }}>
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 800,
                      color: "#FFD700",
                      textShadow: "0 2px 10px rgba(255, 215, 0, 0.5)",
                      fontFamily: "'Bebas Neue', cursive",
                      letterSpacing: "3px",
                      fontSize: { xs: "2.5rem", md: "4rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    VIDEO PREVIEW
                  </Typography>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      mb: 3,
                      maxWidth: "600px",
                      mx: "auto",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 300,
                      fontSize: { xs: "1rem", md: "1.5rem" },
                    }}
                  >
                    Вставьте ссылку на видео и наслаждайтесь просмотром в
                    кинематографичном качестве
                  </Typography>
                </Box>
              </Fade>
            ) : null}

            <StyledCard>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {!showPlayer ? (
                  <Fade in={!loading && !showPlayer} timeout={500}>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ width: "100%" }}
                    >
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InsertLinkIcon
                                sx={{ color: "#FFD700" }}
                                fontSize="medium"
                              />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: "50px",
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.15)",
                            },
                            "& input::placeholder": {
                              color: "rgba(255,255,255,0.6)",
                              opacity: 1,
                            },
                          },
                        }}
                        sx={{ mb: 3 }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading || !videoUrl}
                        fullWidth
                        startIcon={<PlayCircleFilledWhiteIcon />}
                        sx={{
                          py: 2,
                          borderRadius: "50px",
                          fontSize: "1.1rem",
                          background:
                            "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                          boxShadow: "0 4px 15px rgba(254, 107, 139, 0.4)",
                          "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0 6px 20px rgba(254, 107, 139, 0.6)",
                          },
                          transition: "all 0.3s",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          letterSpacing: "1px",
                        }}
                      >
                        {loading ? "Processing..." : "Посмотреть сейчас"}
                      </Button>
                    </Box>
                  </Fade>
                ) : (
                  file && (
                    <ViewVideoPreview
                      file={file}
                      handleBack={handleBack}
                      handleReset={handleReset}
                    />
                  )
                )}

                {loading && <LoadingCircle />}
              </CardContent>
            </StyledCard>

            {!showPlayer && (
              <Fade in={!showPlayer} timeout={1000}>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 3,
                    color: "rgba(255,255,255,0.7)",
                    textAlign: "center",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Поддерживаемые сервисы: YouTube, Vimeo, Dailymotion
                </Typography>
              </Fade>
            )}
          </Box>
        </ContentBox>
      </Container>
    </MoviesBackground>
  );
};

export default Preview;
