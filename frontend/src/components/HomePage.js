import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data?.movies))
      .catch((err) => toast.error(err));
  }, []);

  // Pagination Starts Here
  const [currentpage, setCurrentpage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = movies && movies.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(movies.length / recordsPerPage);
  //Previous Method for copying the array of numbers from 1 to totalPages - 1 (excluding 0) to be used as page numbers in the pagination buttons
  // const numberOfPages = [...Array(totalPages).keys()].slice(1); //this is to create an array of numbers from 1 to totalPages - 1 (excluding 0) to be used as page numbers in the pagination buttons

  //Best Method for copying the array of numbers from current page - 3 to current page + 3 to be used as page numbers in the pagination buttons
  const pageNumbers = []; //this is to create an array of numbers from current page - 3 to current page + 3 to be used as page numbers in the pagination buttons

  for (let i = currentpage - 1; i <= currentpage + 1; i++) {
    //this checks that there will be 1 page number before and 1 page number after the current page
    // Previously i is current page - 3 and i is less than or equal to current page + 3 and i++
    if (i < 1) continue; //if i is less than 1 then continue
    if (i > totalPages) break; //if i is greater than total page then break

    pageNumbers.push(i); //pushing i to page numbers array
  }

  const prevPage = () => {
    if (currentpage > 1) {
      setCurrentpage(currentpage - 1);
    }
  };

  const nextPage = () => {
    if (currentpage < totalPages) {
      setCurrentpage(currentpage + 1);
    }
  };

  const changeCurrentPage = (page) => {
    setCurrentpage(page);
  };

  // Pagination Ends Here

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
        {currentRecords.map((movie, index) => (
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin="auto"
        marginTop={5}
      >
        <div>
          {currentpage - 1 >= 1 && (
            <button
              onClick={prevPage}
              disabled={currentpage < 1}
              style={{
                margin: "0 0.1rem",
                backgroundColor: "purple",
                color: "white",
                border: "none",
                borderRadius: "0.2rem",
              }}
            >
              {"<<"}
            </button>
          )}
          {/* Previous Method for showing number of Pages when clicked */}
          {/* {numberOfPages.map((page, index) => (
            <button key={index} onClick={() => changeCurrentPage(page)}>
              {page}
            </button>
          ))} */}

          {/* Best Method for showing number of Pages when clicked */}
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => changeCurrentPage(page)}
              style={{
                margin: "0 0.1rem",
                backgroundColor: `${page === currentpage ? "red" : "purple"}`,
                color: "white",
                border: "none",
                // boxShadow: `${page === currentpage ? "0 0 5px red" : ""}`,
                borderRadius: "0.2rem",
              }}
            >
              {page}
            </button>
          ))}

          {currentpage + 1 <= totalPages && (
            <button
              onClick={nextPage}
              style={{
                margin: "0 0.1rem",
                backgroundColor: "purple",
                color: "white",
                border: "none",
                borderRadius: "0.2rem",
              }}
            >
              {">>"}
            </button>
          )}
        </div>
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
