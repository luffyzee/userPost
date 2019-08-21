const express = require("express");
const login = require("../routes/login");
const users = require("../routes/users");
const posts = require("../routes/posts");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/login", login);
  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/", async (req, res) => {
    res.send("Root");
  });
};
