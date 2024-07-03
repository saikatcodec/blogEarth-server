const express = require("express");
require("dotenv").config();

require("./configs/dbConnector");
const userRoute = require("./routes/upvoteRoutes");

const app = express();

// TODO: middlewares
// TODO: routers
app.use("/api/v1/user", userRoute);

// TODO: global error handle

// Listen on port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
