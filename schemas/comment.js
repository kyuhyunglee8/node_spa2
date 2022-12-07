const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  
  user: {
    type: String,
    required: true,
  },
  postId:{
    type : String
  },
  password: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Comment", commentSchema);