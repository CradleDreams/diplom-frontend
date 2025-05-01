import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IVideoFile } from "../../../entities/video/model/types";

interface VideoProps {
  videoId: string;
  selectedVideo: IVideoFile;
}
const ViewVideoGenre = ({ videoId, selectedVideo }: VideoProps) => {
  const navigate = useNavigate();

  // Функция для получения середины видео (для превью)
  const getMidFrameUrl = (video: IVideoFile) => {
    if (!video.hlsPath?.fileUrl) return "";
    // Здесь должна быть логика получения середины видео
    // Временное решение - возвращаем первую часть HLS
    return video.hlsPath.fileUrl.replace(".m3u8", "_1.ts");
  };
  return (
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
            image={getMidFrameUrl(selectedVideo)}
            alt={selectedVideo.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              sx={{ fontWeight: 600, color: "#00b4d8" }}
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
              {selectedVideo.summary}
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
                "&:hover": { borderColor: "#00b4d8" },
              }}
              onClick={() => navigate(-1)}
            >
              Назад к списку
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ViewVideoGenre;
