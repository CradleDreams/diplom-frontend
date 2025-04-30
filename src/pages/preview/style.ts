import { Card } from "@mui/material";
import { styled, Box } from "@mui/system";

export const MoviesBackground = styled(Box)({
  minHeight: "100vh",
  backgroundImage: `
      linear-gradient(rgba(10, 10, 20, 0.9), rgba(10, 10, 20, 0.9)),
      url('https://lh6.googleusercontent.com/proxy/fqWkOCC1PcTYefye4ghoJKwUlxH_gbT87bKZ2LEeqm7qOTBu6XJRlZG7ZaeyxZhat4U8Uz2tPgcwA_LtPVayQBDprs-P49n_Qch1D5CEKLpd6CJkF9Lv0AigOk8zkrxdcTk3')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  padding: "2rem 0",
  position: "relative",
});

export const ContentBox = styled(Box)({
  position: "relative",
  zIndex: 1,
});

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  overflow: "visible",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
  background: "rgba(20, 20, 30, 0.9)",
  border: "1px solid rgba(255, 215, 0, 0.3)",
  transition: "all 0.3s ease",
  color: "white",
}));
