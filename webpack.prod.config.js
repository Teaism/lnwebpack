/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:20
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-16 16:26:58
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
      new CleanWebpackPlugin(['dist']),
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