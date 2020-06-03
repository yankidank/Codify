const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  // stuff here
});

const post = mongoose.model("post", postSchema);

module.exports = post;
