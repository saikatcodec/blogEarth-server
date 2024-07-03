const express = require("express");
require("dotenv").config();

require("./configs/dbConnector");

const app = express();

// TODO: middlewares
// TODO: routers
// TODO: global error handle

// Listen on port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
