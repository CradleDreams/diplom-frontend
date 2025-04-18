import { styled } from "@mui/material/styles";

export const NavbarContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const NavbarButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  color: theme.palette.common.white,
  cursor: "pointer",
  fontSize: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));
