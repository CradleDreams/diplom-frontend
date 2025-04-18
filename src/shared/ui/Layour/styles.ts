import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

export const ContentContainer = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
}));
