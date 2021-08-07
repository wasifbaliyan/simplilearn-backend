const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const login = require("./routes/login");
const register = require("./routes/register");

mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to simplilearn DB."))
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

// posts routes
app.use("/auth/register", register);
app.use("/auth/login", login);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at port ${port}!`));
