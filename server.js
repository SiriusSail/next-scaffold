const { createServer } = require('http');
const { parse } = require('url');
const express = require("express");
const url = require("url");
const rMiddle = require("./nodeApi/rMiddle");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const next = require('next');
//判断PC还是移动端
const isPcOrMobile = require("./nodeApi/isPc");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: false }));
    //解析json
    server.use(bodyParser.json());
    //解析cookies
    server.use(cookieParser());
    //提供静态文件目录
    server.use(express.static("static"));


    //axios接口转发
    server.use("/remoteapi", rMiddle);

    server.get("*", function (req, res, next) {
        const { parsedUrl, isPc, realPathname, query } = isPcOrMobile(req);
        req.isPc = isPc;
        app.render(req, res, realPathname, query);
    });

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000')
    })
})
