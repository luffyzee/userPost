const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  body: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Post = new mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = {
    userId: Joi.objectId().required(),
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    body: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost;
