import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import { HomePage } from "../pages/home/HomePage";
import { Genres } from "../pages/genres/Genres";
import Preview from "../pages/preview/Preview";
import { MainLayout } from "../shared/ui/Layour/MainLayout";
import { theme } from "../shared/ui/Theme/theme";
import Analytics from "../pages/analytics/Analytics";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="preview" element={<Preview />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="genres" element={<Genres />} />
              <Route path="genres/:genre" element={<Genres />} />
              <Route path="genres/:genre/:videoId" element={<Genres />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
