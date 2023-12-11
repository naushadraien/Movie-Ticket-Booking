import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";
import { toast } from "react-toastify";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => toast.error(err));
  }, []);

  // console.log(movies[0]._id);

  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest <span style={{ color: "red" }}>Movies</span>
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
                actors={movie.actors}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          sx={{
            margin: "auto",
            color: "white",
            bgcolor: "purple",
            ":hover": {
              bgcolor: "#713ABE",
            },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
