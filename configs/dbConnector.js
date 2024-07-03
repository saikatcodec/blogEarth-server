const mongoose = require("mongoose");

const dbConnector = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected..");
  } catch (err) {
    console.log(err);
  }
};

dbConnector();
