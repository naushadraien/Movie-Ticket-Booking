import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";
import { toast } from "react-toastify";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => toast.error(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4} overflow="hidden">
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="20%"
        bgcolor={"purple"}
        color="white"
        textAlign={"center"}
        fontSize={20}
        fontWeight={"bold"}
        borderRadius={10}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        paddingLeft={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
              actors={movie.actors}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
