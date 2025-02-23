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
    children: [
      {
        segment: "horrors",
        title: "Horrors",
        icon: <DescriptionIcon />,
      },
      {
        segment: "thrillers",
        title: "Thrillers",
        icon: <DescriptionIcon />,
      },
    ],
  },
];

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

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setAuthModalOpen(true); 
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter("/preview");

  const selectedGenre = React.useMemo(() => {
    if (router.pathname === "/genres/horrors") {
      return "Horrors";
    } else if (router.pathname === "/genres/thrillers") {
      return "Thrillers";
    }
    return null; 
  }, [router.pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

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
