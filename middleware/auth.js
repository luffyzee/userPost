const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied no token provided.");
  let tokenSplit = token.split(" ");

  try {
    let decoded = jwt.verify(tokenSplit[1], config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
