// process.env.NODE_ENV = "production";

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
  production:
    "mongodb+srv://sunarya:sunarya@cluster0-ahnue.mongodb.net/test?retryWrites=true&w=majority"
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
