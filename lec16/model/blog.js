const mongoose=require("mongoose")
const Schema = mongoose.Schema;
const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});
module.express=mongoose.model('Blog', BlogPost);