const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://admin:TYDpQ1nWpzBb9AVU@th-cluster0.xskolgo.mongodb.net/tickethack";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
