import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MovieItem = ({ title, releaseDate, posterUrl, id, actors }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Card
      sx={{
        margin: 2,
        width: 300,
        height: 450,
        padding: 2,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img
        height={"55%"}
        width="100%"
        src={posterUrl}
        alt={title}
        style={{ borderRadius: "1rem" }}
      />
      <CardContent className="card-content">
        <Typography gutterBottom variant="h5" component="div">
          <span style={{ color: "purple" }}>{title}</span>
        </Typography>
        <Typography variant="h6" component="div">
          Actors:<span style={{ color: "red" }}> {actors}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={`${isUserLoggedIn ? `/booking/${id}` : "/"}`}
          sx={{
            margin: "auto",
            bgcolor: "purple",
            ":hover": {
              bgcolor: "#713ABE",
            },
          }}
          size="small"
          onClick={() =>
            !isUserLoggedIn && toast.error("Only User Can Book Movie!")
          }
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
