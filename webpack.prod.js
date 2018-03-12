/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:20
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-12 15:57:17
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({sourceMap: true}),
		new webpack.DefinePlugin({'prpcess.env.NODE_ENV': JSON.stringify('production')})
	]
})