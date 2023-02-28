import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    category: {
      type: String,
      // ref: "Category",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    // Comments: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Comment",
    //   },
    // ],
  },
  { timestamps: true }
); 


const Post = mongoose.model('Post',PostSchema)

export default Post