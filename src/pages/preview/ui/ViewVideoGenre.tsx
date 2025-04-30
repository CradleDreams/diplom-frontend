import { IconButton, Typography, Paper, Button } from "@mui/material";
import { Box } from "@mui/system";
import { VideoPlayer } from "../../../entities/video/ui/VideoPlayer";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IVideoFile } from "../../../entities/video/model/types";

interface IVideoProps {
  video: IVideoFile;
  handleBack: () => void;
}
const ViewVideoGenre = ({ video, handleBack }: IVideoProps) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ color: "#FFD700", mr: 1 }}>
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
          {video.title}
        </Typography>
      </Box>

      <VideoPlayer file={video} controls={true} />

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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Длительность:{" "}
            <Box component="span" sx={{ ml: 1, fontWeight: "bold" }}>
              {video.duration}
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
              sx={{ ml: 1, color: "#4CAF50", fontWeight: "bold" }}
            >
              {video.status}
            </Box>
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{ mt: 2, fontFamily: "'Montserrat', sans-serif" }}
        >
          {video.summary}
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
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
        onClick={() => window.open(video.sourceUrl, "_blank")}
      >
        Смотреть на оригинальном сервисе
      </Button>
    </>
  );
};

export default ViewVideoGenre;
