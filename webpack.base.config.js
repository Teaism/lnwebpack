/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:12
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-15 17:12:12
*/

const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/main.js'
		// ,vendors: './src/vendors.js'
	},
	plugins: [
		// new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.tmpl.html'),
			filename: 'index.tmpl.html',
			hash: true,
			inject: '#app'
		})
		/*,
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(true),
			DEVELOPMENT: JSON.stringify(true),
			VERSION: JSON.stringify('5fa3b9'),
			BROWSER_SUPPORTS_HTML5: true,
		})*/
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][hash].bundle.js',
		chunkFilename: '[name].bundle.js'
	}
}