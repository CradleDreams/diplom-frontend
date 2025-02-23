import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";

const genresData = [
  {
    genre: "Horrors",
    videos: [
      {
        id: 1,
        title: "The Conjuring",
        duration: "1h 52m",
        description:
          "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
        image:
          "https://www.osh.by/wp-content/uploads/2023/12/1041436899_0_206_2905_1840_1920x0_80_0_0_c7022893b761781d76fe592010d14bd2.jpg",
      },
      {
        id: 2,
        title: "Insidious",
        duration: "1h 43m",
        description:
          "A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further.",
        image:
          "https://www.osh.by/wp-content/uploads/2023/12/1041436899_0_206_2905_1840_1920x0_80_0_0_c7022893b761781d76fe592010d14bd2.jpg",
      },
    ],
  },
  {
    genre: "Thrillers",
    videos: [
      {
        id: 3,
        title: "Gone Girl",
        duration: "2h 29m",
        description:
          "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him.",
        image:
          "https://www.osh.by/wp-content/uploads/2023/12/1041436899_0_206_2905_1840_1920x0_80_0_0_c7022893b761781d76fe592010d14bd2.jpg",
      },
      {
        id: 4,
        title: "Prisoners",
        duration: "2h 33m",
        description:
          "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads.",
        image:
          "https://www.osh.by/wp-content/uploads/2023/12/1041436899_0_206_2905_1840_1920x0_80_0_0_c7022893b761781d76fe592010d14bd2.jpg",
      },
    ],
  },
];

const truncateDescription = (description: string, maxLength: number) => {
  return description.length > maxLength
    ? `${description.slice(0, maxLength)}...`
    : description;
};

interface GenresProps {
  selectedGenre: string | null;
}

const Genres: React.FC<GenresProps> = ({ selectedGenre }) => {
  const filteredGenres = selectedGenre
    ? genresData.filter((genre) => genre.genre === selectedGenre)
    : genresData;

  return (
    <Box sx={{ padding: 3 }}>
      {filteredGenres.map((genre, genreIndex) => (
        <Box key={genre.genre} sx={{ marginBottom: 4 }}>
          <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>
            {genre.genre}
          </Typography>
          <Grid container spacing={3}>
            {genre.videos.map((video, videoIndex) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: "cover",
                    }}
                    image={video.image}
                    alt={video.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3">
                      {video.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginBottom: 1 }}
                    >
                      Duration: {video.duration}
                    </Typography>
                    <Typography variant="body2">
                      {truncateDescription(video.description, 100)}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", padding: 2 }}
                  >
                    <Chip
                      label={`#${videoIndex + 1}`}
                      color="primary"
                      size="small"
                      sx={{ marginRight: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {genre.genre}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Genres;
