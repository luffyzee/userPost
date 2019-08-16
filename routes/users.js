const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email
  });
  await user.save();
  res.status(201).send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    { new: true }
  );
  if (!user) return res.status(404).send("User not found");

  res.status(200).send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findOneAndDelete(req.params.id);
  if (!user) return res.status(404).send("Invalid User.");
  res.send("Deleted");
});

module.exports = router;
