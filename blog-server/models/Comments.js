

import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  Comment: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },

},{timestamps:true});

const Comment = mongoose.model('Comment',commentSchema)

export default Comment