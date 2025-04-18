import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, keyframes, styled } from "@mui/material";
import { Howl } from "howler";

// Game assets
const JUMP_SOUND = new Howl({
  src: [
    "https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3",
  ],
  volume: 0.3,
});

const SCORE_SOUND = new Howl({
  src: ["https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3"],
  volume: 0.2,
});

const GAME_OVER_SOUND = new Howl({
  src: [
    "https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.mp3",
  ],
  volume: 0.3,
});

const BACKGROUND_MUSIC = new Howl({
  src: [
    "https://assets.mixkit.co/music/preview/mixkit-game-show-suspense-waiting-668.mp3",
  ],
  loop: true,
  volume: 0.1,
});

// Game constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 300;
const GROUND_HEIGHT = 30;
const DINO_WIDTH = 60;
const DINO_HEIGHT = 80;
const DINO_JUMP_HEIGHT = 100;
const JUMP_DURATION = 800;
const GAME_SPEED = 6;
const OBSTACLE_SPAWN_RATE = 1500;
const CLOUD_SPAWN_RATE = 2500;

// Styled components
const GameContainer = styled(Box)({
  position: "relative",
  width: `${GAME_WIDTH}px`,
  height: `${GAME_HEIGHT}px`,
  backgroundColor: "#f0f8ff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  border: "4px solid #FFD700",
  backgroundImage: "linear-gradient(to bottom, #87CEEB, #E0F7FA)",
});

const Ground = styled(Box)({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: `${GROUND_HEIGHT}px`,
  backgroundColor: "#5D4037",
  backgroundImage:
    "repeating-linear-gradient(90deg, #5D4037, #5D4037 20px, #4E342E 20px, #4E342E 40px)",
});

const DinoContainer = styled(Box)({
  position: "absolute",
  width: `${DINO_WIDTH}px`,
  height: `${DINO_HEIGHT}px`,
  bottom: `${GROUND_HEIGHT}px`,
  left: "80px",
  transform: "translateY(0)",
  transition: "transform 0.1s ease-out",
});

const DinoBody = styled(Box)({
  position: "absolute",
  width: "50px",
  height: "60px",
  backgroundColor: "#4CAF50",
  borderRadius: "10px",
  bottom: 0,
  left: "5px",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "30px",
    height: "15px",
    backgroundColor: "#4CAF50",
    top: "-10px",
    left: "10px",
    borderRadius: "15px 15px 0 0",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: "15px",
    height: "25px",
    backgroundColor: "#4CAF50",
    bottom: "0",
    right: "-5px",
    borderRadius: "0 0 5px 5px",
  },
});

const DinoEye = styled(Box)({
  position: "absolute",
  width: "8px",
  height: "8px",
  backgroundColor: "#000",
  borderRadius: "50%",
  top: "15px",
  right: "10px",
});

const DinoLegs = styled(Box)({
  position: "absolute",
  width: "50px",
  height: "10px",
  bottom: "-5px",
  left: "5px",
  display: "flex",
  justifyContent: "space-between",
});

const DinoLeg = styled(Box)({
  width: "8px",
  height: "15px",
  backgroundColor: "#2E7D32",
  borderRadius: "5px",
});

const Obstacle = styled(Box)({
  position: "absolute",
  willChange: "transform",
});

const Cactus = styled(Obstacle)({
  width: "25px",
  backgroundColor: "#2E7D32",
  borderRadius: "5px",
  bottom: `${GROUND_HEIGHT}px`,
  "&::before": {
    content: '""',
    position: "absolute",
    width: "15px",
    height: "20px",
    backgroundColor: "#2E7D32",
    top: "-10px",
    left: "5px",
    borderRadius: "5px",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "#2E7D32",
    top: "-15px",
    left: "8px",
    borderRadius: "50%",
  },
});

const Bird = styled(Obstacle)({
  width: "40px",
  height: "25px",
  backgroundColor: "#FF5722",
  borderRadius: "50%",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "15px",
    height: "8px",
    backgroundColor: "#FF5722",
    top: "8px",
    right: "-5px",
    transform: "rotate(45deg)",
    borderRadius: "5px",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: "5px",
    height: "5px",
    backgroundColor: "#000",
    top: "5px",
    left: "5px",
    borderRadius: "50%",
  },
});

const Cloud = styled(Box)({
  position: "absolute",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "25px",
  willChange: "transform",
  "&::before": {
    content: '""',
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "25px",
  },
});

const ScoreText = styled(Typography)({
  position: "absolute",
  top: "15px",
  right: "25px",
  fontFamily: "'Bebas Neue', cursive",
  fontSize: "28px",
  color: "#333",
  textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
});

const GameOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  backdropFilter: "blur(2px)",
});

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
`;

const StartButton = styled(Button)({
  animation: `${pulse} 1.5s infinite`,
  background: "linear-gradient(45deg, #FF5722 30%, #FF9800 90%)",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.3rem",
  padding: "12px 35px",
  borderRadius: "50px",
  boxShadow: "0 4px 20px rgba(255, 87, 34, 0.4)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 25px rgba(255, 87, 34, 0.6)",
    background: "linear-gradient(45deg, #FF5722 30%, #FF9800 90%)",
  },
  transition: "all 0.3s",
  textTransform: "uppercase",
  letterSpacing: "1px",
});

const run = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

interface DinoGameProps {
  onGameEnd: (score: number) => void;
  onVideoReady: () => void;
  videoReady: boolean;
  onHideGame: () => void;
}

interface Obstacle {
  id: number;
  type: "cactus" | "bird";
  x: number;
  height?: number;
  top?: number;
}

interface Cloud {
  id: number;
  x: number;
  speed: number;
  width: number;
  height: number;
  top: number;
}

const DinoGame: React.FC<DinoGameProps> = ({
  onGameEnd,
  onVideoReady,
  videoReady,
  onHideGame,
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [dinoJumping, setDinoJumping] = useState(false);
  const [dinoRunning, setDinoRunning] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const dinoRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const gameSpeedRef = useRef(GAME_SPEED);
  const lastFrameTimeRef = useRef<number>(0);
  const obstacleTimerRef = useRef<NodeJS.Timeout>(undefined);
  const cloudTimerRef = useRef<NodeJS.Timeout>(undefined);

  // Handle jump
  const handleJump = () => {
    if (!dinoJumping && gameStarted && !gameOver) {
      setDinoJumping(true);
      setDinoRunning(false);
      JUMP_SOUND.play();

      if (dinoRef.current) {
        dinoRef.current.style.transform = `translateY(-${DINO_JUMP_HEIGHT}px)`;
      }

      setTimeout(() => {
        setDinoJumping(false);
        setDinoRunning(true);
        if (dinoRef.current) {
          dinoRef.current.style.transform = "translateY(0)";
        }
      }, JUMP_DURATION);
    }
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setClouds([]);
    gameSpeedRef.current = GAME_SPEED;
    setDinoRunning(true);
    BACKGROUND_MUSIC.play();

    // Start obstacle generation
    obstacleTimerRef.current = setInterval(() => {
      const obstacleType = Math.random() > 0.7 ? "bird" : "cactus";
      const newObstacle: Obstacle = {
        id: Date.now(),
        type: obstacleType,
        x: GAME_WIDTH,
      };

      if (obstacleType === "cactus") {
        newObstacle.height = 40 + Math.random() * 30;
      } else {
        newObstacle.top = 50 + Math.random() * 50;
      }

      setObstacles((prev) => [...prev, newObstacle]);
    }, OBSTACLE_SPAWN_RATE);

    // Start cloud generation
    cloudTimerRef.current = setInterval(() => {
      setClouds((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: GAME_WIDTH,
          speed: 1 + Math.random() * 2,
          width: 40 + Math.random() * 40,
          height: 15 + Math.random() * 15,
          top: 20 + Math.random() * 50,
        },
      ]);
    }, CLOUD_SPAWN_RATE);

    // Start game loop
    lastFrameTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  // Check collision with more precise hitboxes
  const checkCollision = (dinoRect: DOMRect, obstacle: Obstacle) => {
    const dinoLeft = dinoRect.left;
    const dinoRight = dinoRect.right;
    const dinoTop = dinoRect.top;
    const dinoBottom = dinoRect.bottom;

    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + (obstacle.type === "cactus" ? 25 : 40);
    const obstacleTop =
      obstacle.type === "cactus"
        ? GAME_HEIGHT - GROUND_HEIGHT - (obstacle.height || 50)
        : obstacle.top || 80;
    const obstacleBottom =
      obstacle.type === "cactus"
        ? GAME_HEIGHT - GROUND_HEIGHT
        : (obstacle.top || 80) + 25;

    // More precise collision detection with smaller margins
    const collisionMargin = 5;

    return (
      dinoRight > obstacleLeft + collisionMargin &&
      dinoLeft < obstacleRight - collisionMargin &&
      dinoBottom > obstacleTop + collisionMargin &&
      dinoTop < obstacleBottom - collisionMargin
    );
  };

  // Game loop with optimized rendering
  const gameLoop = (timestamp: number) => {
    const deltaTime = timestamp - lastFrameTimeRef.current;
    lastFrameTimeRef.current = timestamp;

    // Move obstacles
    setObstacles((prev) => {
      const newObstacles = prev
        .map((obstacle) => ({
          ...obstacle,
          x: obstacle.x - gameSpeedRef.current * (deltaTime / 16),
        }))
        .filter((obstacle) => obstacle.x > -50);

      // Check for collisions
      if (!gameOver && gameStarted && dinoRef.current) {
        const dinoRect = dinoRef.current.getBoundingClientRect();

        for (const obstacle of newObstacles) {
          if (checkCollision(dinoRect, obstacle)) {
            endGame();
            break;
          }
        }
      }

      return newObstacles;
    });

    // Move clouds
    setClouds((prev) =>
      prev
        .map((cloud) => ({
          ...cloud,
          x: cloud.x - cloud.speed * (deltaTime / 16),
        }))
        .filter((cloud) => cloud.x > -100)
    );

    // Increase score and difficulty
    if (!gameOver && gameStarted) {
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore % 100 === 0) {
          SCORE_SOUND.play();
          gameSpeedRef.current += 0.5;
        }
        return newScore;
      });
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  };

  // End game
  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    setDinoRunning(false);
    GAME_OVER_SOUND.play();
    BACKGROUND_MUSIC.stop();

    if (score > highScore) {
      setHighScore(score);
    }
    onGameEnd(score);

    if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current);
    if (cloudTimerRef.current) clearInterval(cloudTimerRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  // Handle hide game
  const handleHideGame = () => {
    BACKGROUND_MUSIC.stop();
    if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current);
    if (cloudTimerRef.current) clearInterval(cloudTimerRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    onHideGame();
  };

  // Clean up
  useEffect(() => {
    return () => {
      BACKGROUND_MUSIC.stop();
      if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current);
      if (cloudTimerRef.current) clearInterval(cloudTimerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.key === "ArrowUp") && !gameOver) {
        handleJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver]);

  return (
    <GameContainer
      ref={gameAreaRef}
      onClick={handleJump}
      sx={{ cursor: gameStarted ? "pointer" : "default" }}
    >
      {/* Clouds */}
      {clouds.map((cloud) => (
        <Cloud
          key={cloud.id}
          sx={{
            top: `${cloud.top}px`,
            left: `${cloud.x}px`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            "&::before": {
              width: `${cloud.width / 2}px`,
              height: `${cloud.height}px`,
              top: `-${cloud.height / 1.5}px`,
              left: `${cloud.width / 4}px`,
            },
          }}
        />
      ))}

      {/* Dino */}
      <DinoContainer
        ref={dinoRef}
        sx={{
          animation: dinoRunning ? `${run} 0.5s infinite` : "none",
        }}
      >
        <DinoBody>
          <DinoEye />
          <DinoLegs>
            <DinoLeg />
            <DinoLeg />
          </DinoLegs>
        </DinoBody>
      </DinoContainer>

      {/* Obstacles */}
      {obstacles.map((obstacle) =>
        obstacle.type === "cactus" ? (
          <Cactus
            key={obstacle.id}
            sx={{
              left: `${obstacle.x}px`,
              height: `${obstacle.height}px`,
            }}
          />
        ) : (
          <Bird
            key={obstacle.id}
            sx={{
              left: `${obstacle.x}px`,
              top: `${obstacle.top}px`,
            }}
          />
        )
      )}

      {/* Ground */}
      <Ground />

      {/* Score */}
      <ScoreText>Score: {score}</ScoreText>
      <ScoreText sx={{ top: "50px" }}>High Score: {highScore}</ScoreText>

      {/* Start/Game Over overlay */}
      {(!gameStarted || gameOver) && (
        <GameOverlay>
          <Typography
            variant="h3"
            sx={{
              color: "#FFD700",
              mb: 2,
              fontFamily: "'Bebas Neue', cursive",
              letterSpacing: "2px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {gameOver ? "GAME OVER!" : "DINO RUNNER"}
          </Typography>

          {gameOver && (
            <Typography
              variant="h5"
              sx={{
                color: "white",
                mb: 3,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "bold",
              }}
            >
              Your score: {score}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            {!videoReady ? (
              <StartButton onClick={startGame}>
                {gameOver ? "Play Again" : "Start Game"}
              </StartButton>
            ) : (
              <StartButton onClick={onVideoReady}>Watch Video</StartButton>
            )}

            <Button
              variant="outlined"
              sx={{
                color: "#FFD700",
                borderColor: "#FFD700",
                "&:hover": {
                  borderColor: "#FFD700",
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                },
                fontSize: "1.1rem",
                padding: "12px 25px",
                borderRadius: "50px",
              }}
              onClick={handleHideGame}
            >
              Hide Game
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 3,
              color: "rgba(255,255,255,0.8)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {!videoReady
              ? "Your video is still processing..."
              : "Your video is ready to watch!"}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.9rem",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {gameOver ? "Press SPACE or click to jump" : "Press SPACE to start"}
          </Typography>
        </GameOverlay>
      )}
    </GameContainer>
  );
};

export default DinoGame;
