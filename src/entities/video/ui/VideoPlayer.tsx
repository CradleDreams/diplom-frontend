import ReactPlayer from "react-player";
import { Box, Skeleton, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { IVideoFile } from "../model/types";
import Hls from "hls.js";

interface VideoPlayerProps {
  file: IVideoFile;
  controls?: boolean;
}

export const VideoPlayer = ({ file, controls = true }: VideoPlayerProps) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  // Подготавливаем субтитры
  const subtitles = file.subtitles?.map((sub) => ({
    kind: "subtitles" as const,
    src: sub.filePath.fileUrl,
    srcLang: sub.language,
    label: sub.language,
    default: sub.default,
  }));

  useEffect(() => {
    // Проверяем поддержку HLS в браузере
    if (!Hls.isSupported()) {
      setError("Ваш браузер не поддерживает HLS воспроизведение");
    }
  }, []);

  const handleError = (err: any) => {
    console.error("Ошибка воспроизведения:", err);
    setError("Не удалось загрузить видео. Попробуйте позже.");
  };

  return (
    <Box
      sx={{
        position: "relative",
        pt: "56.25%",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {!ready && !error && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: "absolute", top: 0, left: 0 }}
        />
      )}

      {error && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            bgcolor: "error.main",
          }}
        >
          <Typography>{error}</Typography>
        </Box>
      )}

      <ReactPlayer
        ref={playerRef}
        url={file.hlsPath.fileUrl} // Используем HLS URL
        controls={controls}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        onReady={() => setReady(true)}
        onError={handleError}
        playing={true} // Автовоспроизведение при готовности
        config={{
          file: {
            forceHLS: true,
            hlsOptions: {
              enableWorker: true,
              enableSoftwareAES: true,
              startLevel: -1, // Автовыбор качества
              maxBufferLength: 30,
              maxMaxBufferLength: 600,
              maxBufferSize: 60 * 1000 * 1000, // 60MB
              maxBufferHole: 0.5,
            },
            attributes: {
              crossOrigin: "anonymous",
            },
            tracks: subtitles,
          },
        }}
      />
    </Box>
  );
};
