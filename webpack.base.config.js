/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:12
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-13 19:26:07
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');


const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

var pages = getEntry(path.resolve(__dirname, './src/pages/**/*.js')); 

// 获取指定路径下的多入口文件
function getEntry(globPath) {
  var entries = {};
  glob.sync(globPath).forEach(function (name) {
    var n = name.slice(name.lastIndexOf('src/') + 4, name.length - 3);
    n = n.slice(0, n.lastIndexOf('/'));
    //接着我对路径字符串进行了一些裁剪成想要的路径
    entries[n] = name;
  });
     return entries;
}


const webpackConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: pages,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }
     
    ]
  },
  plugins: [
    /*new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.tmpl.html'),
      filename: 'index.html',
      hash: true,
      inject: '#app'
    }),*/

    extractSass
    /*,
    
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      DEVELOPMENT: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
    })*/
  ],
  output: {
    path: path.resolve(__dirname, 'build')
    ,publicPath: 'build',
    filename: '[name]/[hash].bundle.js',
    chunkFilename: '[name]/[name].bundle.js'
  },
  optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 2,
                    name: 'common'
                }
            }
        }
    },

};



console.log(webpackConfig.entry)

Object.keys(pages).forEach(function(pathname) {
  // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
  webpackConfig.entry[pathname] = pages[pathname];

let fileOut = path.resolve(__dirname, './build/' + [pathname] + '/' + pathname.slice(pathname.lastIndexOf('/'))  + '.html');

let tmplOrigin = path.resolve(__dirname, './src/' + [pathname] + '/' + pathname.slice(pathname.lastIndexOf('/'))  + '.html');

  // 每个页面生成一个html
  let plugin = new HtmlWebpackPlugin({
    // 生成出来的html文件名
    filename: fileOut,
    // 模板路径
    template: tmplOrigin,   

    // 自动将引用插入html
    inject: true,
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
     minify: {
      //removeComments: true,
      //collapseWhitespace: true,
      //removeAttributeQuotes: true
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'dependency',
    chunks: [pathname]
  });

  if (pathname in webpackConfig.entry) {
    plugin.chunks = ['manifest', 'vendor', pathname];
    plugin.hash = true;
  }

  webpackConfig.plugins.push(plugin);
})



module.exports = webpackConfig;

