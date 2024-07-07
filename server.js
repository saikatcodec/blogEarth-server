const express = require("express");
require("dotenv").config();

require("./configs/dbConnector");
const userRoute = require("./routes/userRoutes");
const globalErrHandle = require("./middlewares/globalErrHandle");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// middlewares
app.use(express.json());

// User routes
app.use("/api/v1/user", userRoute);

// Post routes
app.use("/api/v1/post", postRoutes);

//  Comment routes
app.use("/api/v1/comment", commentRoutes);

// TODO: upvote routes
// TODO: downvote routes

// global error handle
app.use(globalErrHandle);

// Listen on port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
