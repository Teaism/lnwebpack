/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:12
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-13 14:47:16
*/

const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	plugins: [
		// new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.tmpl.html'),
			filename: 'index.html'
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][hash].bundle.js',
		chunkFilename: '[name].bundle.js'
	}
}