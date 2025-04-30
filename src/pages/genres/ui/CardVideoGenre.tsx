import { CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { VideoCard } from "../style";
import { genresData } from "../../../shared/lib/data/genresData";
import { useNavigate } from "react-router-dom";

interface IVideoProps {
  video: {
    id: number;
    title: string;
    duration: string;
    description: string;
    image: string;
  };
}
const CardVideoGenre = ({ video }: IVideoProps) => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId: string) => {
    const videoGenre =
      genresData.find((genre) =>
        genre.videos.some((video) => video.id.toString() === videoId),
      )?.genre || "";

    navigate(`/genres/${videoGenre}/${videoId}`);
  };
  return (
    <Grid item xs={12} sm={6} md={4} key={video.id}>
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <VideoCard onClick={() => handleVideoClick(video.id.toString())}>
          <CardMedia
            component="img"
            height="200"
            image={video.image}
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
