/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:20
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-13 16:46:36
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)?$/,
				use: 'url-loader'
			},
			{
				test: /\.(png|jp?g|gif|svg)(\?.*)$/,
				use: [{
					loader: 'url-loader',
					options: { limit: 8192, name: 'images/[name].[hash:7].ext'}
				}]
			}
		]
	},
	plugins: [
		new UglifyJSPlugin({sourceMap: true}),
		// new webpack.DefinePlugin({'prpcess.env.NODE_ENV': JSON.stringify('production')}),
		new ExtractTextPlugin('css/[name].[contenthash].css')
	]
});