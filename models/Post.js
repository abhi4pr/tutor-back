import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    post_img: {
      type: String,
      trim: true,
      required: false,
    },
    category: {
      type: String,
      enum: [
        "School",
        "College",
        "IAS",
        "IIT-JEE",
        "NEET",
        "UPSC",
        "SSC",
        "Banking",
        "CAT",
        "GATE",
        "Engineering",
        "Medical",
        "Law Entrance",
        "CA/CS",
        "Railway Exams",
        "Defence Exams",
        "Spoken English",
        "Soft Skills",
        "Hobby Classes",
        "Other",
      ],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fees: {
      type: String,
      required: false,
    },
    center_address: {
      type: String,
      required: true,
    },
    timings: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
