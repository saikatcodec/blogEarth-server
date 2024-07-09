const mongoose = require("mongoose");
const appError = require("../utils/appError");
const User = require("./User");

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

upvoteSchema.post("findOneAndDelete", async (res, next) => {
  if (res) {
    const user = await User.findById(res.author);
    user.upvotes = user.upvotes.filter(
      (uid) => uid.toString() !== res._id.toString()
    );
    await user.save();
  }
  next();
});

const Upvote = mongoose.model("Upvote", upvoteSchema);
module.exports = Upvote;
