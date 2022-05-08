/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index'),
    // entry: ['./src/artworkCropper.js', './src/workshopCropper.js', './src/tabInfo.js'],
    watch: true,
    output: {
        path: path.join(__dirname, 'dist', 'steam', 'js'),
        publicPath: '/dist/',
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images/'
                    //the images will be emited to dist/assets/images/ folder
                }
            }
        ]
    },
    plugins: [
        /* Use the ProvidePlugin constructor to inject jquery implicit globals */
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery",
            'global.jQuery': 'jquery'
        })
    ],
    resolve: {
        alias: {
            'jquery': 'jquery'
        }
    }
};