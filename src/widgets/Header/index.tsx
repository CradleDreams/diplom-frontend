import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import Preview from "../Preview";
import type { Session } from "@toolpad/core/AppProvider";
import { useDemoRouter } from "@toolpad/core/internal";
import Genres from "../Genres";
import AuthModal from "../../shared/modal/AuthModal";
import {
  IconButton,
  Menu,
  MenuItem,
  Select,
  Box,
  Button,
  Chip,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppDispatch, useTypedSelector } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/userSlice";

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface DemoProps {
  window?: () => Window;
}

export default function Header(props: DemoProps) {
  const { window } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useTypedSelector((state) => state.user);

  const [session, setSession] = React.useState<Session | null>(null);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  const authentication = React.useMemo(() => {
    console.log(user);

    return {
      signIn: () => {
        setAuthModalOpen(true);
      },
      signOut: () => {
        setSession(null);
        dispatch(removeUser());
      },
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setSession({
      user: {
        name: user?.username,
        email: user?.email,
        image: "https://avatars.githubusercontent.com/u/19550456",
      },
    });
  }, [user]);

  const router = useDemoRouter("/preview");

  const [popoverAnchorEl, setPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? "simple-popover" : undefined;

  const handlePopoverButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (event: React.MouseEvent<HTMLElement>) => {
    if (event) {
      event.stopPropagation();
    }
    setPopoverAnchorEl(null);
  };

  // Список всех доступных жанров
  const allGenres = [
    { segment: "horrors", title: "Horrors", icon: <DescriptionIcon /> },
    { segment: "thrillers", title: "Thrillers", icon: <DescriptionIcon /> },
    { segment: "action", title: "Action", icon: <DescriptionIcon /> },
    { segment: "comedy", title: "Comedy", icon: <DescriptionIcon /> },
    { segment: "drama", title: "Drama", icon: <DescriptionIcon /> },
    { segment: "sci-fi", title: "Sci-Fi", icon: <DescriptionIcon /> },
    { segment: "romance", title: "Romance", icon: <DescriptionIcon /> },
    { segment: "adventure", title: "Adventure", icon: <DescriptionIcon /> },
    { segment: "fantasy", title: "Fantasy", icon: <DescriptionIcon /> },
    { segment: "animation", title: "Animation", icon: <DescriptionIcon /> },
    { segment: "documentary", title: "Documentary", icon: <DescriptionIcon /> },
    { segment: "mystery", title: "Mystery", icon: <DescriptionIcon /> },
  ];

  // Состояние для управления добавленными жанрами
  const [genres, setGenres] = React.useState([
    { segment: "horrors", title: "Horrors", icon: <DescriptionIcon /> },
    { segment: "thrillers", title: "Thrillers", icon: <DescriptionIcon /> },
  ]);

  const [selectedGenreToAdd, setSelectedGenreToAdd] = React.useState("");

  // Функция для добавления жанра
  const handleAddGenre = () => {
    if (selectedGenreToAdd) {
      const genreToAdd = allGenres.find(
        (genre) => genre.segment === selectedGenreToAdd
      );
      if (genreToAdd) {
        setGenres([...genres, genreToAdd]);
        setSelectedGenreToAdd("");
      }
    }
  };

  // Функция для удаления жанра
  const handleRemoveGenre = (segment: string) => {
    setGenres(genres.filter((genre) => genre.segment !== segment));
  };

  // Получение списка доступных для добавления жанров
  const availableGenres = allGenres.filter(
    (genre) => !genres.some((g) => g.segment === genre.segment)
  );

  const selectedGenre = React.useMemo(() => {
    const genre = genres.find(
      (genre) => router.pathname === `/genres/${genre.segment}`
    );
    return genre ? genre.title : null;
  }, [router.pathname, genres]);

  const demoWindow = window !== undefined ? window() : undefined;

  const popoverMenuAction = (
    <>
      <Chip label={genres.length} color="primary" size="small" />
      <IconButton
        aria-describedby={popoverId}
        onClick={handlePopoverButtonClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id={popoverId}
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        disableAutoFocus
        disableAutoFocusItem
      >
        <Box sx={{ padding: 2 }}>
          <Select
            value={selectedGenreToAdd}
            onChange={(e) => setSelectedGenreToAdd(e.target.value as string)}
            displayEmpty
            fullWidth
            size="small"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="" disabled>
              Выберите жанр
            </MenuItem>
            {availableGenres.map((genre) => (
              <MenuItem key={genre.segment} value={genre.segment}>
                {genre.title}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            onClick={handleAddGenre}
            disabled={!selectedGenreToAdd}
            fullWidth
          >
            Добавить жанр
          </Button>
        </Box>
      </Menu>
    </>
  );

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: "preview",
      title: "Preview",
      icon: <PersonalVideoIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Analytics",
    },
    {
      segment: "genres",
      title: "Genres",
      icon: <FolderIcon />,

      action: popoverMenuAction,
      children: genres.map((genre) => ({
        ...genre,
        action: (
          <IconButton
            onClick={(e) => {
              handleRemoveGenre(genre.segment);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        ),
      })),
    },
  ];

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <MovieCreationIcon fontSize="large" />,
        title: "VideoViewer",
        homeUrl: "/preview",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout>
        <PageContainer>
          {router.pathname === "/preview" && <Preview />}
          {(router.pathname === "/genres" ||
            router.pathname.startsWith("/genres/")) && (
            <Genres selectedGenre={selectedGenre} />
          )}
        </PageContainer>
      </DashboardLayout>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </AppProvider>
  );
}
