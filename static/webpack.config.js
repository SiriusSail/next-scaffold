/**打包静态文件**/

const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//清理dist文件的webpack包
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//列出webpack打包生成列表清单
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    mode: 'none',
    entry: {
        mStyle: './static/js/mStyle.js',
        pcStyle: './static/js/pcStyle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }, {
                    loader: "js-to-less-var-loader"
                }                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ],

    },
    plugins:[
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};
