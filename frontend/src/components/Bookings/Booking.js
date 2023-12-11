import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const { id } = useParams();
  // console.log(id);
  // console.log(movie);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => toast.error(err));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        toast.success("Booked Successfully!");
        navigate("/user");
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div className="flex">
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            <span style={{ color: "purple" }}>Book Ticket for Movie:</span>{" "}
            <span style={{ color: "red" }}>{movie.title}</span>
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
                className="img"
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2} sx={{ color: "purple" }} className="typy">
                  {movie.description}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer:
                  <span style={{ color: "red" }}>
                    {movie.actors.map((actor) => " " + actor + " ")}
                  </span>
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date:{" "}
                  <span style={{ color: "red" }}>
                    {new Date(movie.releaseDate).toDateString()}
                  </span>
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
                  <FormLabel style={{marginBottom: "-1rem"}}>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    sx={{
                      mt: 3,
                      bgcolor: "green",
                      color: "white",
                      ":hover": {
                        bgcolor: "darkgreen",
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
