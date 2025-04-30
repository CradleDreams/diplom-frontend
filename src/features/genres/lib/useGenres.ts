import { useState } from "react";
import { genresData } from "../../../shared/lib/data/genresData";

export const useGenres = () => {
  const allGenres = genresData.map((g) => ({
    segment: g.genre.toLowerCase(),
    title: g.genre,
  }));

  const [genres, setGenres] = useState(allGenres.slice(0, 2));
  const [selectedGenreToAdd, setSelectedGenreToAdd] = useState("");

  const availableGenres = allGenres.filter(
    (genre) => !genres.some((g) => g.segment === genre.segment),
  );

  const handleAddGenre = () => {
    if (selectedGenreToAdd) {
      const genreToAdd = allGenres.find(
        (g) => g.segment === selectedGenreToAdd,
      );
      if (genreToAdd) {
        setGenres([...genres, genreToAdd]);
        setSelectedGenreToAdd("");
      }
    }
  };

  const handleRemoveGenre = (segment: string) => {
    setGenres(genres.filter((g) => g.segment !== segment));
  };

  return {
    genres,
    availableGenres,
    selectedGenreToAdd,
    setSelectedGenreToAdd,
    handleAddGenre,
    handleRemoveGenre,
  };
};
