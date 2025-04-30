import { Box, Tooltip } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { IVideoFile } from "../model/types";

interface VideoPlayerProps {
  file: IVideoFile;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export const VideoPlayer = ({
  file,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
}: VideoPlayerProps) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [showControls, setShowControls] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null);

  const baseUrl = `http://${file.hlsPath.fileUrl.replace(/\\/g, "/").replace(/\/[^/]+$/, "")}`;
  const url = `http://${file.hlsPath.fileUrl.replace(/\\/g, "/")}`;

  useEffect(() => {
    setReady(false);
    setError(null);
    setPlaying(autoPlay);

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [url, autoPlay]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const convertTimecodeToSeconds = (timecode: string): number => {
    const parts = timecode.split(":");
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]);
      const seconds = parseFloat(parts[1]);
      return minutes * 60 + seconds;
    }
    return 0;
  };

  const ProgressBarWithMarkers = () => {
    if (
      !file.timestamps ||
      file.timestamps.length === 0 ||
      duration === 0 ||
      !showControls
    )
      return null;

    return (
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "25px",
          width: "550px",
          height: "4px",
          // backgroundColor: "rgba(255, 0, 0, 0.2)",
          zIndex: 1,
        }}
      >
        {file.timestamps.map((timestamp, index) => {
          const seconds = convertTimecodeToSeconds(timestamp.timecode);
          const position = (seconds / duration) * 100;

          return (
            <Tooltip
              key={index}
              title={`${timestamp.timecode} - ${timestamp.title}`}
              arrow
            >
              <Box
                sx={{
                  position: "absolute",
                  left: `${position}%`,
                  top: "-4px",
                  width: "5px",
                  height: "12px",
                  backgroundColor: "#ffeb3b",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transform: "translateX(-4px)",
                  "&:hover": {
                    height: "16px",
                    top: "-6px",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  playerRef.current?.seekTo(seconds, "seconds");
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    );
  };

  return (
    <Box
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      sx={{
        position: "relative",
        pt: "56.25%",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#000",
        "& .react-player__progress": {
          height: "4px !important",
        },
      }}
    >
      {/* Остальной код остается без изменений */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          "& .react-player": {
            "& .react-player__controls": {
              paddingBottom: "40px !important",
            },
          },
        }}
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          controls={controls}
          width="600px"
          height="100%"
          muted={muted}
          loop={loop}
          onReady={() => setReady(true)}
          onError={() => setError("Не удалось воспроизвести видео")}
          onDuration={setDuration}
          onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(loop)}
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
                playsInline: true,
              },
              hlsOptions: {
                xhrSetup: (xhr: XMLHttpRequest, url: string) => {
                  const segmentName = decodeURIComponent(url).split("/").at(-1);
                  if (url.endsWith(".ts")) {
                    xhr.open(
                      "GET",
                      `${baseUrl}/${decodeURIComponent(file.hlsPath.fileUrl).split("\\").at(-1)!.replace(".m3u8", "")}/${segmentName}`,
                      true,
                    );
                  } else {
                    xhr.open("GET", url, true);
                  }
                },
              },
            },
          }}
        />
        {ProgressBarWithMarkers()}
      </Box>
    </Box>
  );
};
