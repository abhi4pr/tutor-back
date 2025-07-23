import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    rating: {
      type: Number,
      trim: true,
      required: true,
    },
    given_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    given_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
