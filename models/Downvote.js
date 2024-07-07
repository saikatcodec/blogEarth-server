const mongoose = require("mongoose");

const downvoteSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Downvote = mongoose.model("Downvote", downvoteSchema);
module.exports = Downvote;
