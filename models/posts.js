const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  // stuff here
  
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
