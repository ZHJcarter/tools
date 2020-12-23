const path = require('path');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const postcss = require('postcss');

const ClientConfig = {
    mode: 'development',
    context: path.resolve(__dirname, "src", "client"),
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        hotOnly: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 3000,
        publicPath: '/'
    },
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'build', 'client'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    module: {
        rules: [
            {
                options: {
                    presets: [
                        '@babel/preset-react',
                    ]
                },
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, "src", "client"),
                ]
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "src", "client"),
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: `[path]-[name]--[local]`,
                            },
                            sourceMap: true,

                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: `[name].css`,
            ignoreOrder: true
        })
    ]
};

// const ServerConfig = {
//     context: path.resolve(__dirname, "src", "server"),
//     entry: "./index.js",
//     output: {
//         filename: "index.js",
//         path: path.resolve(__dirname, "build", "server"),
//         publicPath: "/"
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: 'babel-loader',
//                 include: /node_module/
//             }
//         ]
//     },
//     resolve: {
//         alias: {
//             "~": path.resolve(__dirname, "build", "server"),
//         },
//         extensions: [".js", ".json"]
//     },
//     target: "node"
// }

module.exports = [ClientConfig];