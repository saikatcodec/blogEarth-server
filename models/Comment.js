const mongoose = require("mongoose");
const User = require("./User");

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to delete reference from user
commentSchema.post("findOneAndDelete", async (res, next) => {
  if (res) {
    const user = await User.findById(res.author);

    user.comments = user.comments.filter(
      (cid) => cid.toString() !== res._id.toString()
    );
    await user.save();
  }
  next();
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
