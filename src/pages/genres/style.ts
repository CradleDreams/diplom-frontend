import { Accordion, Card } from "@mui/material";
import { styled, Box } from "@mui/system";

export const PageContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  color: "white",
});

export const GenreAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: "12px !important",
  overflow: "hidden",
  marginBottom: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: theme.spacing(2, 0),
  },
}));

export const VideoCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "all 0.3s ease",
  background: "rgba(255, 255, 255, 0.05)",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 10px 25px rgba(0, 150, 255, 0.3)",
    border: "1px solid rgba(0, 150, 255, 0.5)",
  },
});
