const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Post", PostSchema);
