const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './index.js',
    ],
    output: {
        filename: 'bundle.js',
        // the output bundle

        path: resolve(__dirname, 'static'),
        publicPath: '/static',
        // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, 'client'),

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        // enable HMR on the server

        contentBase: resolve(__dirname, 'static'),
        // match the output path

        publicPath: '/',
        // match the output `publicPath`

        //fallback to root for other urls
        historyApiFallback: true,

        proxy: {
            '/api': {
                target: 'http://localhost:8080',
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1&localIdentName=[path]--[local]&camelCase&modules&sourceMap',
                    'postcss-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
        },
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
};