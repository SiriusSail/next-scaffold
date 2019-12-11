
const job = process.env.NODE_JOB;
const path = require("path");

function moduleDir(m) {
    return path.dirname(require.resolve(`${m}/package.json`));
}

function configs() {
    // fix: prevents error when .css files are required by node
    ///参考网址：https://github.com/zeit/next.js/blob/canary/examples/with-antd-mobile/next.config.js
    if (typeof require !== 'undefined') {
        // eslint-disable-next-line
        require.extensions['.css'] = file => { }
    }
    if (job !== 'BUILD') return {};
    // const optimizedImages = require("next-optimized-images");
    // TODO: 如果是预发或者线上，则压缩图片，不然就不压缩
    const imgLoader = require('next-images');
    const withLess = require("@zeit/next-less");
    const withCSS = require('@zeit/next-css');
    const withPlugins = require('next-compose-plugins');
    //图片压缩plugin
    const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
    //打包分析
    return withPlugins([
        [imgLoader, {
            inlineImageLimit: 8192,
        }],
        [withCSS],
        [withLess, {
            lessLoaderOptions: {
                javascriptEnabled: true,

            },
            postcssLoaderOptions: {
                parser: true,
                config: {
                    ctx: {
                        theme: JSON.stringify(process.env.REACT_APP_THEME)
                    }
                }
            }
        },
        ]
    ], {
        webpack: (config, { dev, isServer, entrypoints }) => {
            config.resolve.extensions = [".web.js", ".js", ".jsx", ".json"];
            config.module.rules.push(
                {
                    test: /\.(svg)$/i,
                    loader: "emit-file-loader",
                    options: {
                        name: "dist/[path][name].[ext]"
                    },
                    include: [
                        moduleDir("antd"),
                        __dirname
                    ]
                },
                {
                    test: /\.(svg)$/i,
                    loader: "svg-sprite-loader",
                    include: [
                        moduleDir("antd"),
                        __dirname
                    ]
                },
                {
                    loader: 'webpack-ant-icon-loader',
                    enforce: 'pre',
                    include: [
                        path.resolve('node_modules/@ant-design/icons/lib/dist')
                    ]
                }
                // {
                //   test: /\.(less)$/i,
                //   use: [
                //     require.resolve('style-loader'),
                //      {
                //        loader: require.resolve('css-loader')
                //    },
                //     {
                //       loader: require.resolve('less-loader')
                //       }
                //   ],
                // }
            );
            //增加css压缩
            config.plugins.push(
                new OptimizeCssAssetsPlugin({
                    // assetNameRegExp: /\.iconfont\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true
                })
            );
            if (!isServer) {
                config.optimization.splitChunks.cacheGroups.react = {
                    name: 'modules',
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    minChunks: 35,
                    enforce: true
                };

            }

            const originalEntry = config.entry;

            config.entry = async () => {
                const entries = await originalEntry();
                if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
                    entries['main.js'].unshift('./client/polyfills.js');
                }
                return entries;
            };

            return config;
        }
    },
        );
}
module.exports = configs();