const config = require("config");
const post = require("./routes/posts");
const user = require("./routes/users");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

const configDB = {
  development: "mongodb://localhost/userPost",
  test: "mongodb://localhost/userPost_test"
};

const env = process.env.NODE_ENV || "development";

const dbConnection = configDB[env];

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log(`Connected to ${dbConnection}`));

app.use(express.json());
app.use("/api/users", user);
app.use("/api/posts", post);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

module.exports = app;
