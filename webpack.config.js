/*!
* @Author: Administrator
* @Date:   2018-03-08 11:04:28
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-09 18:31:22
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const config = {
	entry: {
		app: './src/index.js',
		// print: './src/print.js'
	},
	/*devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({title: 'output Management'}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	},*/
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}

}

module.exports = config;