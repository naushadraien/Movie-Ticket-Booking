import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    enum: ["user", "admin"],
    type: String,
    default: "user",
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  addedMovies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
      default: undefined,
    },
  ],
});

export default mongoose.model("User", userSchema);
