import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Skeleton,
  InputAdornment,
} from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

interface VideoInfo {
  title: string;
  genre: string;
  description: string;
  url: string;
}

const Preview: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setVideoData({
        title: "Amazing Nature",
        genre: "Documentary",
        description:
          "A breathtaking journey through the world's most stunning landscapes.",
        url: videoUrl,
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setVideoData(null);
    setVideoUrl("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "background.default",
        gap: 2,
      }}
    >
      {!videoData ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            marginTop: !isLoading ? "22%" : '0',
            display: "flex",
            alignItems: "center",
            width: "80%",
            maxWidth: "800px",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InsertLinkIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    borderRadius: "0 25px 25px 0",
                    height: "56px",
                    minWidth: "100px", 
                  }}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              ),
              sx: {
                borderRadius: "25px",
                paddingRight: 0, 
              },
            }}
          />
        </Box>
      ) : (
        <>
          <ReactPlayer url={videoData.url} controls width="80%" height="auto" />
          <Card sx={{ width: "80%", maxWidth: "800px" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Title: {videoData.title}
              </Typography>
              <Typography color="text.secondary">
                Genre: {videoData.genre}
              </Typography>
              <Typography variant="body2">
                Description: {videoData.description}
              </Typography>
            </CardContent>
          </Card>
          <Button
            onClick={handleReset}
            variant="outlined"
            sx={{ mt: 2, borderRadius: "25px" }}
          >
            Back to form
          </Button>
        </>
      )}
      {isLoading && (
        <Box sx={{ width: "80%", maxWidth: "800px" }}>
          <Skeleton variant="rectangular" width="100%" height={400} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      )}
    </Box>
  );
};

export default Preview;
