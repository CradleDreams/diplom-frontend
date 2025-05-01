import { Box, Skeleton, Typography, Button, Stack, Chip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { IVideoFile, ITimeStamp } from "../model/types";

interface VideoPlayerProps {
  file: IVideoFile;
  controls?: boolean;
}

export const VideoPlayer = ({ file, controls = true }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subtitleTracks, setSubtitleTracks] = useState<TextTrack[]>([]);
  const [audioTracks, setAudioTracks] = useState<any[]>([]);
  const [currentAudioTrack, setCurrentAudioTrack] = useState(0);
  const [currentSubtitleLang, setCurrentSubtitleLang] = useState<string | null>(
    "ru",
  );
  const [currentTime, setCurrentTime] = useState(0);

  const url = `http://localhost:3001/uploads/JavaProgrammingTutorialSystem/master.m3u8`;

  // Функция для преобразования времени в секунды
  const timeToSeconds = (timeString: string): number => {
    const parts = timeString.split(":").map((part) => parseFloat(part));
    if (parts.length === 3) {
      // Формат HH:MM:SS
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // Формат MM:SS
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  // Обновление текущего времени видео
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  // Переход к указанному таймкоду
  const seekToTimestamp = (timecode: string) => {
    const video = videoRef.current;
    if (!video) return;

    const seconds = timeToSeconds(timecode);
    video.currentTime = seconds;
    video.play();
  };

  // Проверка, активен ли текущий таймкод
  const isTimestampActive = (
    timestamp: ITimeStamp,
    index: number,
    timestamps: ITimeStamp[],
  ): boolean => {
    const currentSeconds = currentTime;
    const timestampSeconds = timeToSeconds(timestamp.timecode);

    // Если это последний таймкод, проверяем от него до конца видео
    if (index === timestamps.length - 1) {
      return currentSeconds >= timestampSeconds;
    }

    // Иначе проверяем между текущим и следующим таймкодом
    const nextTimestampSeconds = timeToSeconds(timestamps[index + 1].timecode);
    return (
      currentSeconds >= timestampSeconds &&
      currentSeconds < nextTimestampSeconds
    );
  };

  useEffect(() => {
    if (videoRef.current) {
      const hls = new Hls({ debug: false, startLevel: -1 });
      hlsRef.current = hls;

      hls.loadSource(url);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setReady(true);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError("Ошибка воспроизведения");
          hls.destroy();
        }
      });

      hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, () => {
        const hlsTracks = hls.subtitleTracks;

        const video = videoRef.current;
        if (!video) return;

        // Удаляем старые <track>
        const existingTracks = video.querySelectorAll("track");
        existingTracks.forEach((track) => track.remove());

        const addedTracks: TextTrack[] = [];

        hlsTracks.forEach((track, index) => {
          const trackElement = document.createElement("track");
          trackElement.kind = "subtitles";
          trackElement.label = track.name;
          trackElement.srclang = track.lang!;
          trackElement.src = track.url!;
          trackElement.default = index === 0;

          video.appendChild(trackElement);

          // Сохраняем для пользовательского интерфейса
          addedTracks.push({
            label: track.name,
            language: track.lang!,
            mode: "disabled",
            kind: "subtitles",
            cues: [], // пусто, но важно для типизации
            activeCues: [],
          } as unknown as TextTrack); // приводим вручную к TextTrack
        });

        setSubtitleTracks(addedTracks);
      });

      hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (_, data) => {
        setAudioTracks(data.audioTracks);
      });

      hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, (_, data) => {
        setCurrentAudioTrack(data.id);
      });

      return () => {
        hls.destroy();
      };
    }
  }, [url]);

  const selectSubtitle = (lang: string | null) => {
    const tracks = videoRef.current?.textTracks;
    if (!tracks) return;

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      track.mode = track.language === lang ? "showing" : "disabled";
    }

    setCurrentSubtitleLang(lang);
  };

  const selectAudio = (index: number) => {
    if (hlsRef.current) {
      hlsRef.current.audioTrack = index;
    }
  };

  return (
    <Box>
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
              p: 2,
            }}
          >
            <Typography>{error}</Typography>
          </Box>
        )}

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <video
            ref={videoRef}
            controls={controls}
            style={{ width: "100%", height: "100%" }}
            crossOrigin="anonymous"
            playsInline
          />
        </Box>
      </Box>

      {/* Блок таймкодов */}
      {file.timestamps && file.timestamps.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Таймкоды:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {file.timestamps.map((timestamp, index) => (
              <Chip
                key={index}
                label={`${timestamp.timecode} - ${timestamp.title}`}
                onClick={() => seekToTimestamp(timestamp.timecode)}
                color={"primary"}
                variant={
                  isTimestampActive(timestamp, index, file.timestamps!)
                    ? "filled"
                    : "outlined"
                }
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {subtitleTracks.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2">Субтитры:</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant={!currentSubtitleLang ? "contained" : "outlined"}
              onClick={() => selectSubtitle(null)}
            >
              Выключить
            </Button>
            {subtitleTracks.map((track, index) => (
              <Button
                key={index}
                variant={
                  track.language === currentSubtitleLang
                    ? "contained"
                    : "outlined"
                }
                onClick={() => selectSubtitle(track.language)}
              >
                {track.label || track.language}
              </Button>
            ))}
          </Stack>
        </Box>
      )}

      {audioTracks.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2">Аудио:</Typography>
          <Stack direction="row" spacing={1}>
            {audioTracks.map((track, index) => (
              <Button
                key={index}
                variant={index === currentAudioTrack ? "contained" : "outlined"}
                onClick={() => selectAudio(index)}
              >
                {track.name || track.lang}
              </Button>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};
