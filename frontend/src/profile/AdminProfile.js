import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteMovies,
  deleteUsers,
  getAdminById,
  getAllUsers,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  // console.log(admin);
  const [user, setUser] = useState();
  // console.log(user);
  useEffect(() => {
    // deleteMovies();
    getAllUsers()
      .then((res) => setUser(res.users))
      .catch((err) => toast(err));
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => toast.error(err));
  }, []);

  const deleteUser = (id) => {
    deleteUsers(id)
      .then((res) => console.log(res))
      .catch((err) => toast.error(err));
  };

  const deleteMovie = (id) => {
    deleteMovies(id)
      .then((res) => {
        toast.success("Deleted Successfully!");
        window.location.reload();
      })
      .catch((err) => toast.error(err));
  };
  return (
    <Box width={"100%"} display="flex" overflow="hidden" className="box">
      <Fragment>
        {" "}
        {admin && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
          >
            <Typography
              variant="h5"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
              sx={{ color: "purple", fontWeight: "bold" }}
            >
              Admin Profile:
            </Typography>
            <AccountCircleIcon
              sx={{ fontSize: "8rem", textAlign: "center", ml: 8 }}
              className="acc-icon"
            />

            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              className="name-email"
            >
              Email: {admin.email}
            </Typography>
          </Box>
        )}
        {admin && admin.addedMovies.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h5"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
              sx={{ color: "purple", fontWeight: "bold" }}
            >
              Added Movies:
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      textTransform: "uppercase",
                    }}
                    className="list"
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      {movie.title}
                    </ListItemText>
                    <IconButton
                      color="error"
                      onClick={() => deleteMovie(movie._id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
        {user && user.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h5"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
              sx={{ color: "purple", fontWeight: "bold" }}
            >
              Users:
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {user.map((user) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      textTransform: "uppercase",
                    }}
                    className="list"
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      {user.name}
                    </ListItemText>
                    <IconButton
                      color="error"
                      onClick={() => deleteUser(user._id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default AdminProfile;
