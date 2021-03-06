/*!
* @Author: fanger
* @Date:   2018-03-12 10:53:29
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-19 18:32:11
*/

const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');

module.exports = merge(base, {
	devtool: 'inline-source-map',
	devServer: {
		// 本地服务器所加载的页面所在的目录
		contentBase: path.resolve(__dirname, 'dist'),
    //通过publicPath路径访问
    // publicPath: '/dist/',
		host: '127.0.0.1',
		port: '8012',
    //跳转
    // historyApiFallback: true, 
		// 实时刷新
		inline: true
	}
});

