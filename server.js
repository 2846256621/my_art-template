const http = require('http');
const template = require('art-template');
const fs = require('fs');
const path = require('path');
http.createServer(function (req,res) {

    /**
     * node中使用art_template 模板引擎
     * 模板最开始是诞生于服务器领域  后来发展到前端
     *   1.安装 npm install art_template
     *   2.引入模块 const template = require('art-template')
     *   3.使用：template.render('模板',{对象})方法
     *
     * */

    // let result = template.render('hello {{name}}',{
    //           name:'jack'
    // });
    // console.log(result);


    fs.readFile(path.join(__dirname,"test.html"),function (err,data) {
        if(err)
            throw err;
        //默认读取到的数据是二进制，render 方法接收的是字符串
        //需要把data二进制数据转换成字符串  所以需要toString()
        console.log(data.toString());
        fs.readFile(path.join(__dirname,"data.json"),function (err,files) {
            if(err)
                throw err;

            let rest = template.render(data.toString(), {
                title: "个人信息",
                data: JSON.parse(files)
            });
            console.log(JSON.parse(files));
            res.end(rest);
        })
    })
}).listen(8080,function () {
    console.log("http://localhost:8080");
});