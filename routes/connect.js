var mongoose = require("mongoose")

//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/blog", function (err) {
    if (!err) {
        console.log("数据库已连接");
    }
});
//定义骨架
var articleSchema = mongoose.Schema({
    title: String,
    con: String,
    tags: String,
    time: String,
    abstract: String,
    comments: String,
    classify: String
});
//发布模型
var articleModel = mongoose.model("article", articleSchema, "article");

module.exports = articleModel;