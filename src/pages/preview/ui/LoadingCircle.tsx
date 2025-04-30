import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

const LoadingCircle = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={400}
        sx={{ borderRadius: "12px", bgcolor: "rgba(255,255,255,0.1)" }}
      />
      <Skeleton
        variant="text"
        sx={{ mt: 2, fontSize: "2rem", bgcolor: "rgba(255,255,255,0.1)" }}
      />
      <Skeleton
        variant="text"
        width="60%"
        sx={{ fontSize: "1.5rem", bgcolor: "rgba(255,255,255,0.1)" }}
      />
    </Box>
  );
};

export default LoadingCircle;
