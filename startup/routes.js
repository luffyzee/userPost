const express = require("express");
const login = require("../routes/login");
const users = require("../routes/users");
const posts = require("../routes/posts");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/logn", login);
  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.get("/", async (req, res) => {
    res.send("Root");
  });
};
