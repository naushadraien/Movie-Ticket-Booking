import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingAdmin;
  try {
    existingAdmin = await User.findOne({ email, role: "admin" });
  } catch (err) {
    return console.log(err);
  }

  if (existingAdmin?._id) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  let admin;
  const hashedPassword = bcrypt.hashSync(password && password);
  try {
    admin = new User({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }
  if (!admin?._id) {
    return res.status(500).json({ message: "Unable to store admin" });
  }
  return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await User.findOne({ email, role: "admin" });
  } catch (err) {
    return console.log(err);
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return res.status(200).json({
    message: "Welcome Back Admin!",
    token,
    id: existingAdmin._id,
  });
};

export const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await User.find({ role: "admin" });
  } catch (err) {
    return console.log(err);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins });
};

export const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await User.findById(id).populate("addedMovies");
  } catch (err) {
    return console.log(err);
  }
  if (admin.role !== "admin") {
    throw new Error("Not Authorized as admin");
  }
  return res.status(200).json({ admin });
};
