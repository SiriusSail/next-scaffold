const { createServer } = require('http');
const { parse } = require('url');
const express = require("express");
const url = require("url");
const next = require('next');
//判断PC还是移动端
const isPcOrMobile = require("./nodeApi/isPc");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get("*", function (req, res, next) {
        const { parsedUrl, isPc, realPathname, query } = isPcOrMobile(req);

        app.render(req, res, realPathname, query);
    });

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000')
    })
})
