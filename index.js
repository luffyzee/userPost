const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("./startup/routes")(app);

const port = process.env.PORT || 3000;

const configDB = {
  development: "mongodb://localhost/userPost",
  test: "mongodb://localhost/userPost_test",
  production: process.env.DBCONNECTION
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

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

module.exports = app;
