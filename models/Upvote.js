const mongoose = require("mongoose");
const appError = require("../utils/appError");

const upvoteSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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

upvoteSchema.post("save", (err, res, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    next(appError("You upvoted already.", 409));
  } else {
    next(err);
  }
});

const Upvote = mongoose.model("Upvote", upvoteSchema);
module.exports = Upvote;
