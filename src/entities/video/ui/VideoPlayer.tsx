import ReactPlayer from "react-player";
import { Box, Skeleton } from "@mui/material";
import { useState } from "react";

interface VideoPlayerProps {
  url: string;
  controls?: boolean;
}

export const VideoPlayer = ({ url, controls = true }: VideoPlayerProps) => {
  const [ready, setReady] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        pt: "56.25%",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {!ready && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
      <ReactPlayer
        url={url}
        controls={controls}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        onReady={() => setReady(true)}
        config={{
          youtube: {
            playerVars: { modestbranding: 1, rel: 0 },
          },
          vimeo: {
            playerOptions: { byline: false, portrait: false },
          },
        }}
      />
    </Box>
  );
};
