const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
const fawn = require("fawn");
const { Post, validate } = require("../models/post");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

fawn.init(mongoose);

router.get("/", async (req, res) => {
  const post = await Post.find()
    .populate("user", "name")
    .sort("user");
  res.send(post);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  let post = new Post({
    title: req.body.title,
    body: req.body.body,
    user: req.body.userId
  });

  await post.save();
  user.post.push(post);
  await user.save();
  res.status(201).send(post);
});

router.delete("/", auth, async (req, res) => {
  const { error } = validateDelete(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = await Post.findById(req.body.postId);
  if (!post) return res.status(404).send("Post not found");

  let user = await Post.findOne({ user: req.body.userId });
  if (!user) return res.status(400).send("Access denied");

  user = await User.findById(req.body.userId);
  removePost(user.post, post._id);
  user.save();
  post = await Post.findByIdAndDelete(req.body.postId);
  res.send(user);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      body: req.body.body
    },
    { new: true }
  );
  if (!post) return res.status(404).send("Post not found");

  let user = await Post.findOne({ user: req.body.userId });
  if (!user) return res.status(400).send("Access denied");

  res.send(post);
});

function validateDelete(post) {
  const schema = {
    postId: Joi.objectId().required(),
    userId: Joi.objectId().required()
  };
  return Joi.validate(post, schema);
}

function removePost(post, elem) {
  var index = post.indexOf(elem);
  if (index > -1) {
    post.splice(index, 1);
  }
}

module.exports = router;
