/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:20
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-14 16:23:22
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css',
	disable: process.env.NODE_ENV === 'development'
})

module.exports = merge(common, {
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: extractSass.extract({
					{
						test: /\.scss$/,
						use: extractSass.extract({
							use: 'css-loader', 'sass-loader'],
							fallback: 'style-loader'
						})
					},
				})
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)?$/,
				use: 'url-loader'
			},
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
		new UglifyJSPlugin({sourceMap: true}),
		extractSass
		// new webpack.DefinePlugin({'prpcess.env.NODE_ENV': JSON.stringify('production')}),
		// new ExtractTextPlugin('css/[name].[contenthash].css')
		/*new webpack.DefinePlugin({
			'process.env': {
                NODE_ENV: '"production"'
            }
		})*/
	]
});