/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:12
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-15 18:50:25
*/

const path = require("path");
const webpack = require("webpack");
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.tmpl.html"),
      filename: "index.html",
      hash: true,
      inject: "#app"
    }),
    new UglifyJSPlugin({sourceMap: true}),
    
    /*,
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(true),
			DEVELOPMENT: JSON.stringify(true),
			VERSION: JSON.stringify('5fa3b9'),
			BROWSER_SUPPORTS_HTML5: true,
		})*/
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: ['style-loader','css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      /*{
        test: /\.css$/,
        use: extractSass.extract({
          use: ['style-loader','css-loader'],
          fallback: 'style-loader'
        })
      },*/
      {
        test: /\.(png|jp?g|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8192, name: 'images/[name].[hash:7].ext'}
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][hash].bundle.js",
    chunkFilename: "[name].bundle.js"
  }
};
