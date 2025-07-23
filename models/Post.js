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
    },
    images: {
      type: [String],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Default", "Health", "Lifestyle", "Education", "Entertainment"],
      default: "Default",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 3;
}

const Post = mongoose.model("Post", postSchema);

export default Post;
