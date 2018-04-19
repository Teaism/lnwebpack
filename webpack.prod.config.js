/*!
* @Author: fanger
* @Date:   2018-03-12 10:53:20
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-19 11:49:31
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');

module.exports = merge(base, {
  devtool: 'source-map',
 /* module: {
  rules: [
      
  ]
},*/
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({sourceMap: true}),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
  ]
});



