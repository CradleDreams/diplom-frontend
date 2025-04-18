import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Skeleton,
  Paper,
  Container,
  styled,
  IconButton,
  TextField,
  InputAdornment,
  Fade,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { VideoPlayer } from "../../entities/video/ui/VideoPlayer";
import { genresData } from "../../features/genres/lib/genresData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { createFile } from "../../entities/video/model/videoSlice";

// Стилизованные компоненты
const MoviesBackground = styled(Box)({
  minHeight: "100vh",
  backgroundImage: `
    linear-gradient(rgba(10, 10, 20, 0.9), rgba(10, 10, 20, 0.9)),
    url('https://lh6.googleusercontent.com/proxy/fqWkOCC1PcTYefye4ghoJKwUlxH_gbT87bKZ2LEeqm7qOTBu6XJRlZG7ZaeyxZhat4U8Uz2tPgcwA_LtPVayQBDprs-P49n_Qch1D5CEKLpd6CJkF9Lv0AigOk8zkrxdcTk3')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  padding: "2rem 0",
  position: "relative",
});

const ContentBox = styled(Box)({
  position: "relative",
  zIndex: 1,
});

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  overflow: "visible",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
  background: "rgba(20, 20, 30, 0.9)",
  border: "1px solid rgba(255, 215, 0, 0.3)",
  transition: "all 0.3s ease",
  color: "white",
}));

const Preview = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const videoId = searchParams.get("videoId");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { file, loading } = useSelector((state: RootState) => state.video);

  const [videoData, setVideoData] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (videoId) {
      // Загрузка данных видео из genresData
      const foundVideo = genresData
        .flatMap((genre) => genre.videos)
        .find((video) => video.id.toString() === videoId);

      if (foundVideo) {
        setVideoData({
          ...foundVideo,
          status: "ready",
          sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
        });
      }
    }
  }, [videoId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user && videoUrl) {
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
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={400}
                        sx={{
                          borderRadius: "12px",
                          bgcolor: "rgba(255,255,255,0.1)",
                        }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{
                          mt: 2,
                          fontSize: "2rem",
                          bgcolor: "rgba(255,255,255,0.1)",
                        }}
                      />
                      <Skeleton
                        variant="text"
                        width="60%"
                        sx={{
                          fontSize: "1.5rem",
                          bgcolor: "rgba(255,255,255,0.1)",
                        }}
                      />
                    </Box>
                  ) : (
                    <>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <IconButton
                          onClick={handleBack}
                          sx={{ color: "#FFD700", mr: 1 }}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: "'Bebas Neue', cursive",
                            letterSpacing: "1px",
                            color: "#FFD700",
                          }}
                        >
                          {videoData.title}
                        </Typography>
                      </Box>

                      <VideoPlayer url={videoData.sourceUrl} controls={true} />

                      <Paper
                        elevation={0}
                        sx={{
                          mt: 3,
                          p: 3,
                          borderRadius: "12px",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: "white",
                          borderLeft: "4px solid #FFD700",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            Длительность:{" "}
                            <Box
                              component="span"
                              sx={{
                                ml: 1,
                                fontWeight: "bold",
                              }}
                            >
                              {videoData.duration}
                            </Box>
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            Статус:{" "}
                            <Box
                              component="span"
                              sx={{
                                ml: 1,
                                color: "#4CAF50",
                                fontWeight: "bold",
                              }}
                            >
                              {videoData.status}
                            </Box>
                          </Typography>
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{
                            mt: 2,
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {videoData.description}
                        </Typography>
                      </Paper>

                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<PlayCircleFilledWhiteIcon />}
                        sx={{
                          mt: 3,
                          py: 1.5,
                          borderRadius: "50px",
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
                        onClick={() =>
                          window.open(videoData.sourceUrl, "_blank")
                        }
                      >
                        Смотреть на оригинальном сервисе
                      </Button>
                    </>
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
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <IconButton
                        onClick={handleBack}
                        sx={{ color: "#FFD700", mr: 1 }}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: "'Bebas Neue', cursive",
                          letterSpacing: "1px",
                          color: "#FFD700",
                        }}
                      >
                        {file?.title || ""}
                      </Typography>
                    </Box>

                    <VideoPlayer url={videoUrl} controls={true} />
                    {file ? (
                      <>
                        <Paper
                          elevation={0}
                          sx={{
                            mt: 3,
                            p: 3,
                            width: 600,
                            borderRadius: "12px",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                            borderLeft: "4px solid #FFD700",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontFamily: "'Montserrat', sans-serif",
                              }}
                            >
                              Длительность:{" "}
                              <Box
                                component="span"
                                sx={{
                                  ml: 1,
                                  fontWeight: "bold",
                                }}
                              >
                                {file.duration}
                              </Box>
                            </Typography>
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontFamily: "'Montserrat', sans-serif",
                              }}
                            >
                              Статус:{" "}
                              <Box
                                component="span"
                                sx={{
                                  ml: 1,
                                  color: "#4CAF50",
                                  fontWeight: "bold",
                                }}
                              >
                                {file.status}
                              </Box>
                            </Typography>
                          </Box>

                          <Typography
                            variant="body1"
                            sx={{
                              mt: 2,
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            {file.description}
                          </Typography>
                        </Paper>
                        <Button
                          onClick={handleReset}
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: "50px",
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
                          Загрузить другое видео
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                {loading && (
                  <Box sx={{ width: "100%" }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={300}
                      sx={{
                        borderRadius: "12px",
                        bgcolor: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{
                        mt: 2,
                        fontSize: "2rem",
                        bgcolor: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      sx={{
                        fontSize: "1.5rem",
                        bgcolor: "rgba(255,255,255,0.1)",
                      }}
                    />
                  </Box>
                )}
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
