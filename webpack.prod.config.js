/*!
* @Author: fanger
* @Date:   2018-03-12 10:53:20
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-16 16:53:57
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = merge(base, {
    devtool: 'source-map',
   /* module: {
    rules: [
        {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8192,
                    publicPath: 'images/', 
                    name: '[path][name]/[hash:7].ext'
                }
            }]
        }
    ]
  },*/
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin({sourceMap: true}),
        /*new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),*/
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
    ]
});



