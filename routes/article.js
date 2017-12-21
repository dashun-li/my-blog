var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")
var articleModel = require("./connect");


/* save-article */
router.post('/article_save.html', function (req, res) {
    var title = req.body.title,
        tags = req.body.tags,
        time = req.body.time,
        classify = req.body.classify,
        abstract = req.body.abstract,
        con = req.body.con;
    //实例化模型,保存数据
    var articledata = new articleModel();
    articledata.title = title;
    articledata.time = time;
    articledata.tags = tags;
    articledata.classify = classify;
    console.log(classify)
    articledata.con = con;
    articledata.abstract = abstract;
    articledata.save(function (err) {
        if (!err) {
            res.send("1")
        } else {
            res.send("0")
        }
    })
});
/* end save-article */
/* get-article */
router.get("/get_article.html", function (req, res) {
    articleModel.find({}).exec(function (err, data) {
        res.send(data);
    })
});
/* end get-article */
/* edit-article */
router.post("/update.html", function (req, res) {
    
    var id = req.body.id;
    articleModel.findById({
        "_id": id
    }).exec(function (err, data) {
        res.send(data);
    })
});
/* end edit-article */
/* save-edit */
router.post('/edit_save.html', function (req, res) {
    var title = req.body.title,
        time = req.body.time,
        classify = req.body.classify,
        abstract = req.body.abstract,
        tags = req.body.tags,
        id = req.body.id,
        con = req.body.con;
    articleModel.findById({
        "_id": id
    }).exec(function (err, data) {
        data.title = title;
        data.time = time;
        data.tags = tags;
        data.classify = classify;
        data.con = con;
        data.abstract = abstract;
        data.save(function (err) {
            if (err) {
                res.send("0")
            } else {
                res.send("1")
            }
        });
    })
});
/* end save-edit */
// 删除数据
router.post("/del.html", function (req, res) {
    var id = req.body.id;
    articleModel.findById({
        "_id": id
    }).exec(function (err, data) {
        if (!err) {
            data.remove()
            res.send("1");
        } else {
            res.send("0")
        }
    })
});
// 搜索
router.post("/search.html",function(req,res){
    var title = req.body.title;
    obj ={};
    obj.title = new RegExp(title);
    articleModel.find(obj).exec(function(err,data){
        if(!err){
            res.send(data)
        }else{
            res.send("111")
        }
    })
})


module.exports=router;