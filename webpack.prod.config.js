/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:20
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-15 18:50:30
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');



module.exports = merge(base, {
	devtool: 'source-map',
	
	plugins: [
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