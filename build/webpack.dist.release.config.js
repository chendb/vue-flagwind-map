const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");

module.exports = merge(webpackBaseConfig,
{
    entry:
    {
        main: "./src/index.ts"
    },
    output:
    {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/dist/",
        filename: "vue-flagwind-map.min.js",
        library: "vue-flagwind-map",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    externals: 
    {
        "vue": "vue",
        "vue-router": "vue-router",
        "vuex": "vuex",
        "flagwind-core": "flagwind-core",
        "flagwind-map": "flagwind-map",
        "flagwind-web": "flagwind-web"
    },
    plugins: 
    [
        new webpack.DefinePlugin
        ({
            "process.env":
            {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin
        ({
            output:
            {
                comments: false
            },
            compress: 
            {
                warnings: false
            }
        })
    ]
});
