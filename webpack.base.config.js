/*!
* @Author: fanger
* @Date:   2018-03-12 10:53:12
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-19 14:54:33
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');


// 获取多页面入口js文件
// __dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录H:\WWW\aaa\lnwebpack。
var pagesEntry = getEntry(path.join(__dirname, 'src/pages/**/*.js')); 

// 获取指定路径下的多入口文件
function getEntry(globPath) {
  let entries = {};
  glob.sync(globPath).forEach(function (path) {
    //裁剪路径字符串为想要的入口名(为多入口生成对应目录层级)
    let name = path.slice(path.lastIndexOf('src/') + 4, path.length - 3);
    name = name.slice(0, name.lastIndexOf('/'));
    entries[name] = path;
  });
     return entries;
}

// 基础配置
const webpackConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: pagesEntry,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader', options: {
              sourceMap: true,
              importLoaders: 2 
            }
          }, {
            loader: 'sass-loader', options: {
              sourceMap: true
            }
          }, 
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ 
            loader: 'css-loader', 
            options: { 
              importLoaders: 1 
              // 指定启用css modules
              // modules: true,  
              // 指定css的类名格式
              // localIdentName: '[name]__[local]--[hash:base64:5]' 
            } 
          }, 
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: { 
            context: 'src/',
            limit: 8192,
            // 因为已复制图片到dist,避免重复这里处理后不改变图片文件名
            // name: '[path]/[name].[hash:8].[ext]'
            name: '[path]/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    // 提取css
    new ExtractTextPlugin({
      //输出的路径及文件名
      filename: '[name]/[contenthash].css',
      allChunks: true,
      // disable: process.env.NODE_ENV === 'development'
    }),
    // 复制src/pages/静态资源到build(dist)下
    new CopyWebpackPlugin([{ 
        // 通过context: 'src/'复制时直接从src/下复制到build下
        context: 'src/',
        from: '**/*', 
        toType: 'dir'
      }], {
      ignore: ['*.html', '*.js', '*.scss', '*.css']
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    // 发布地址，打包文件中所有相对路径引用的资源都会被配置的路径所替换。
    // publicPath: path.join(__dirname, 'dist'),
    filename: '[name]/[hash].js',
    chunkFilename: '[name]/[name].[hash:5].bundle.js'
  }
};


// 遍历页面目录生成多入口
Object.keys(pagesEntry).forEach(function(pathname) {
  // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
  // webpackConfig.entry[pathname] = pages[pathname];
  
  // console.log(pathname)
  // console.log(webpackConfig.entry[pathname])
  // console.log(webpackConfig.output.filename);

  let fileOut = path.join(__dirname, 'dist/' + [pathname] + '/' + pathname.slice(pathname.lastIndexOf('/'))  + '.html');
  let tmplOrigin = path.join(__dirname, 'src/' + [pathname] + '/' + pathname.slice(pathname.lastIndexOf('/'))  + '.html');

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
    }
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'dependency',
  });

  if (pathname in webpackConfig.entry) {
    plugin.chunks = ['manifest', 'vendor', pathname];
    plugin.hash = true;
  }
  webpackConfig.plugins.unshift(plugin);
})

module.exports = webpackConfig;

