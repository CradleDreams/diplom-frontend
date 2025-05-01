import { useState, useEffect } from "react";
import { CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { VideoCard } from "../style";
import { genresData } from "../../../shared/lib/data/genresData";
import { useNavigate } from "react-router-dom";
import { IVideoFile } from "../../../entities/video/model/types";

interface IVideoProps {
  video: IVideoFile;
}

const CardVideoGenre = ({ video }: IVideoProps) => {
  const navigate = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const handleVideoClick = (videoId: string) => {
    navigate(`/genres/${video.genre}/${videoId}`);
  };

  useEffect(() => {
    const getMidFrameUrl = async () => {
      return new Promise<string>((resolve) => {
        const videoEl = document.createElement("video");
        videoEl.crossOrigin = "anonymous"; // Important for CORS
        videoEl.src = video.hlsPath?.fileUrl || "";

        videoEl.addEventListener("loadedmetadata", () => {
          videoEl.currentTime = Math.min(videoEl.duration / 2, 10); // Cap at 10s if duration is long

          videoEl.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoEl.videoWidth || 640;
            canvas.height = videoEl.videoHeight || 360;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
              console.log(canvas.toDataURL());
              resolve(canvas.toDataURL());
            } else {
              resolve(""); // Fallback if canvas fails
            }
          });
        });

        videoEl.addEventListener("error", () => {
          resolve(""); // Fallback if video fails to load
        });
      });
    };

    getMidFrameUrl().then(setThumbnailUrl);
  }, [video.hlsPath?.fileUrl]);

  return (
    <Grid item xs={12} sm={6} md={4} key={video._id}>
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <VideoCard onClick={() => handleVideoClick(video._id.toString())}>
          <CardMedia
            component="img"
            height="200"
            image={thumbnailUrl || "/placeholder.jpg"} // Add a fallback image
            alt={video.title}
            sx={{ borderBottom: "2px solid #00b4d8" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 600 }}>
              {video.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              {video.duration}
            </Typography>
          </CardContent>
        </VideoCard>
      </motion.div>
    </Grid>
  );
};

export default CardVideoGenre;
