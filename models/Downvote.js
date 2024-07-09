const mongoose = require("mongoose");
const User = require("./User");
const appError = require("../utils/appError");

const downvoteSchema = new mongoose.Schema(
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

downvoteSchema.post("save", (err, res, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    next(appError("You downvoted already.", 409));
  } else {
    next(err);
  }
});

downvoteSchema.post("findOneAndDelete", async (res, next) => {
  if (res) {
    const user = await User.findById(res.author);
    user.downvotes = user.downvotes.filter(
      (did) => did.toString() !== res._id.toString()
    );
    await user.save();
  }
  next();
});

const Downvote = mongoose.model("Downvote", downvoteSchema);
module.exports = Downvote;
