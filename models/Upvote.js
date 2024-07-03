const mongoose = require("mongoose");

const upvoteSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Upvote = mongoose.model("Upvote", upvoteSchema);
module.exports = Upvote;
