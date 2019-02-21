const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const utils = require("./utils");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

function assetsPath(_path) {
    const assetsSubDirectory = "static";

    return path.posix.join(assetsSubDirectory, _path);
}

const webpackConfig = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: "./doc/index.ts"
    },
    resolve: {
        extensions: [".js", ".vue", ".json", ".ts"],
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            "doc": resolve("doc"),
            "src": resolve("src"),
            "views": resolve("doc/views")
        }
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js",
        publicPath: ""
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: "pre",
                loader: "tslint-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: utils.cssLoaders
                    ({
                        sourceMap: true,
                        extract: true
                    }),
                    cssSourceMap: true,
                    cacheBusting: true,
                    transformToRequire:
                    {
                        video: ["src", "poster"],
                        source: "src",
                        img: "src",
                        image: "xlink:href"
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolve("src"), resolve("test")]
            },
            {
                test: /^(?!.*(customize))(.*)(\.(png|jpe?g|gif|svg)(\?.*)?)$/,
                loader: "url-loader",
                options: {
                    limit: 20000,
                    name: utils.assetsPath("images/[name].[hash:7].[ext]")
                }
            },
            {
                test: /^(.*(customize))(.*)(\.(png|jpe?g|gif|svg)(\?.*)?)$/,
                loader: "url-loader",
                options: {
                    limit: 1,
                    name: utils.assetsPath("images/customize/[name].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(html|tpl)$/,
                loader: "raw-loader"
            },

            ...utils.styleLoaders({
                sourceMap: true,
                extract: true,
                usePostCSS: true
            })

        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it"s native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    },
    devtool: false,
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: assetsPath("js/[name].[chunkhash].js"),
        chunkFilename: assetsPath("js/[id].[chunkhash].js")
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        // new webpack.DefinePlugin({
        //     "process.env": env
        // }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: true,
            parallel: true
        }),

        // extract css into its own file
        new ExtractTextPlugin({
            filename: assetsPath("css/[name].[contenthash].css"),
            allChunks: true,
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
                map: {
                    inline: false
                }
            }
        }),

        new HtmlWebpackPlugin({
            filename: path.join(__dirname, "../dist/arcgis.html"),
            template: path.join(__dirname, "../doc/arcgis.html"),
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false
            },
            chunksSortMode: "dependency"
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, "../dist/minemap.html"),
            template: path.join(__dirname, "../doc/minemap.html"),
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false
            },
            chunksSortMode: "dependency"
        }),

        // keep module.id stable when vender modules does not change
        new webpack.HashedModuleIdsPlugin(),

        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "../static"),
            to: "static",
            ignore: [".*"]
        }])
    ]
};


module.exports = webpackConfig;
