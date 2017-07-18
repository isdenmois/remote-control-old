const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const strip = require('strip-loader');

module.exports = {
    entry: [
        './index.tsx',
    ],
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'static'),
        publicPath: '/static',
    },

    context: resolve(__dirname, 'client'),

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    strip.loader('debug'),
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
                include: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?localIdentName=[hash:base64:5]&camelCase&modules'
                    ],
                }),
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            { test: /\.png$/, use: 'url-loader?limit=10000' },
            { test: /\.jpg$/, use: 'file-loader' },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
            },
        }),
        new ExtractTextPlugin({
            allChunks: true,
            filename: '[name].css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
            },
            output: {
                ascii_only: true,
                comments: false
            },
            sourceMap: false,
            test: /vendors\.js/,
        }),
        new BabiliPlugin({}, {
            test: /index\.js$/,
            comments: false,
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: isExternal,
        }),
    ],
};

function isExternal(module) {
    const  userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('node_modules') >= 0;
}
