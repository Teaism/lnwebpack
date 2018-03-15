/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:12
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-15 22:13:26
*/

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    index: "./src/main.js"
    // ,vendors: './src/vendors.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  },
  plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.tmpl.html"),
            filename: "index.html",
            hash: true,
            inject: "#app"
        }),
    // new ExtractTextPlugin('style.css')
    
    /*,
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      DEVELOPMENT: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
    })*/
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][hash].bundle.js",
    chunkFilename: "[name].bundle.js"
  }
};
