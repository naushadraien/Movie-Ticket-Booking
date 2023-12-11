import axios from "axios";
import { toast } from "react-toastify";
export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((err) => toast.error(err));

  if (res.status !== 200) {
    return toast.error("No Data");
  }

  const data = await res.data;
  return data;
};

export const getAllUsers = async () => {
  const res = await axios.get("/user").catch((err) => toast.error(err));

  if (res.status !== 200) {
    return toast.error("No Data");
  }

  const { data } = res;
  return data;
};

export const deleteUsers = async (id) => {
  const res = await axios
    .delete(`/user/${id}`)
    .then((res) => {
      toast.success("Deleted Successfully!");
      window.location.reload();
    })
    .catch((err) => toast.error(err));

  if (res.status !== 200) {
    return toast.error("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
    name: signup ? data.name : "",
    email: data.email,
    password: data.password,
  });

  if (res.status !== 200 && res.status !== 201) {
    toast.error("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data, signup) => {
  const res = await axios.post(`/admin/${signup ? "signup" : "login"}`, {
    email: data && data.email,
    password: data && data.password,
  });

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((err) => toast.error(err));
  if (res.status !== 200) {
    return toast.error("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteMovies = async (id) => {
  const res = await axios.delete(`/movie/${id}`);

  if (res.status !== 200) {
    return toast.error("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = await axios.post("/booking", {
    movie: data.movie,
    seatNumber: data.seatNumber,
    date: data.date,
    user: localStorage.getItem("userId"),
  });
  // .catch((err) => toast.error("Error from API", err.response.data.message));

  if (res.status !== 201) {
    return toast.error("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/bookings/${id}`)
    // .then((res) => console.log("response",res))
    .catch((err) => toast.error(err));

  if (res.status !== 200) {
    return toast.error("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .then((res) => {
      toast.success("Deleted Successfully!");
      window.location.reload();
    })
    .catch((err) => toast.error(err));

  if (res.status !== 200) {
    return toast.error("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => toast.error(err));
  if (res.status !== 200) {
    return toast.error("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios.post(
    "/movie",
    {
      title: data.title,
      description: data.description,
      releaseDate: data.releaseDate,
      posterUrl: data.posterUrl,
      fetaured: data.fetaured,
      actors: data.actors,
      admin: localStorage.getItem("adminId"),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => toast.error(err));

  if (res.status !== 200) {
    return toast.error("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
