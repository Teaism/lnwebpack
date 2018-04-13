/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:20
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-13 19:23:44
*/

const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = merge(base, {
    devtool: 'source-map',
    module: {
    rules: [
      {
        test: /\.(png|jp?g|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8192, name: 'images/[name].[hash:7].ext'}
        }]
      }
    ]
  },
    plugins: [
      new CleanWebpackPlugin(['build']),
        new UglifyJSPlugin({sourceMap: true})
        /*new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),*/
        
        // extractSass
        // new ExtractTextPlugin('style.css')
        // new webpack.DefinePlugin({'prpcess.env.NODE_ENV': JSON.stringify('production')}),
        // new ExtractTextPlugin('css/[name].[contenthash].css')
        /*new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })*/
    ]
});



