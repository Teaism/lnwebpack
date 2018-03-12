/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:12
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-12 16:57:57
*/

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({title: 'Production'})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}