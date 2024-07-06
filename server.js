const express = require("express");
require("dotenv").config();

require("./configs/dbConnector");
const userRoute = require("./routes/userRoutes");
const globalErrHandle = require("./middlewares/globalErrHandle");
const postRoutes = require("./routes/postRoutes");

const app = express();

// TODO: middlewares
app.use(express.json());

// TODO: routers
// User routes
app.use("/api/v1/user", userRoute);

// Post routes
app.use("/api/v1/posts", postRoutes);

// global error handle
app.use(globalErrHandle);

// Listen on port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
