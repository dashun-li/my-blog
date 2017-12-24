var express = require('express');
var router = express.Router();
var mongoose=require("mongoose")
var articleModel = require("./connect");

//创建骨架
var userSchema = mongoose.Schema({
    username:String,
    pwd:String
});
//发布模型
var userModel= mongoose.model("user",userSchema,"user")
//验证登录(login页面)
router.post("/1116/log.html",function(req,res){
    var username = req.body.username;
    var pwd = req.body.pwd;
    userModel.find({"username":username,"pwd":pwd}).exec(function(err,data){
        if(data.length != 0){
             res.cookie("user",username); 
             res.send("1")
         }else{
             res.send("0")
         }
    });
})

//验证登录(如果不是从登录界面进.就验证登录)
router.get('/checklog.html', function(req, res) {
    var ck = req.cookies.user;
    if(!ck){
         res.send("location.href='index.html'");
    }else{
        res.send("1")
    }
});
//点击退出系统,退出后台并跳转到网站首页
router.get('/1116/logout.html', function (req, res) {
    //清除缓存
    res.clearCookie("user");
    res.send("<script>location.href='index.html';history.pushState(null,null,'login.html')</script>")
});
// 分页
function pagination(req, res,datas,url){
     articleModel.find(datas).exec(function (err, data) {
         //设置每页显示的数据条数
         var count = 3;
         //由前端传入页码数
         //如果传入页码,就显示当前页码,如果没有传入页码就默认显示第一页
         var page = req.query.page ? req.query.page : 1;
         //(需要跳过的数据数)
         var n = (page - 1) * count;
         //获取数据的所有数据(除了findById找到的是对象,find找到的数据都是用数组的形式呈现)
         //获取数据总条数
         var datacount = data.length;
         //设置总页数
         var pagecount = Math.ceil(datacount / count);
         articleModel.find(datas).limit(count).skip(n).exec(function (err, data) {
             //将pagecount追加到数组data中
             data.push({
                 "page": page
             });
             data.push({
                 "pagecount": pagecount
             })
             res.render(url, {
                 data: data
             });
         })
     })
}

// 首页
router.get("/", function (req, res) {
    pagination(req, res,{},'index')
});
// 首页
router.get("/index.html", function (req, res) {
    pagination(req, res,{},'index')
});

// 单独文章页面
router.get("/article.html", function (req, res) {
    var id =req.query.id;
    var classify=req.query.classify;
    articleModel.findById(id).exec(function (err, data) {
        var list={};
        list.data =data;
        articleModel.find({'classify':classify}).limit(4).exec(function(err,data){
            list.data1=data;
            res.render('article',{data:list})
        })
    });
   
});

// 分类页面
router.get("/category.html", function (req, res) {
    var classify =req.query.classify;
    pagination(req, res, { 'classify': classify},'category')
});
module.exports = router;

