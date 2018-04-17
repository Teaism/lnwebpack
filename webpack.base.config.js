/*!
* @Author: fanger
* @Date:   2018-03-12 10:53:12
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-17 17:37:57
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');



/*const extractSass = new ExtractTextPlugin({
  filename: '[name]/[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});
*/

// 获取多页面
var pages = getEntry(path.resolve(__dirname, './src/pages/**/*.js')); 

// 获取指定路径下的多入口文件
function getEntry(globPath) {
  let entries = {};
  glob.sync(globPath).forEach(function (name) {
    //裁剪路径字符串为想要的路径(对应多入口名字)
    let n = name.slice(name.lastIndexOf('src/') + 4, name.length - 3);
    n = n.slice(0, n.lastIndexOf('/'));
    entries[n] = name;
  });
     return entries;
}

// 基础配置
const webpackConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: pages,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: "css-loader", options: {
                  sourceMap: true
              }
          }, {
              loader: "sass-loader", options: {
                  sourceMap: true
              }
          }]
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
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: { 
            limit: 8192,
            name: '[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]/[contenthash].css',
      disable: process.env.NODE_ENV === 'development'
    }),
    new CopyWebpackPlugin([{ 
        from: 'pages/**/*', 
        toType: 'dir',
        // 通过context: 'src/'复制时直接从src/下复制到build下
        context: 'src/'
      }], {
      ignore: ['*.html', '*.js', '*.scss']
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
    publicPath: path.resolve(__dirname, 'dist'),
    filename: '[name]/[hash].js',
    chunkFilename: '[name]/[name].[hash:5].bundle.js'
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

// 遍历页面目录生成多入口
Object.keys(pages).forEach(function(pathname) {
  // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
  // webpackConfig.entry[pathname] = pages[pathname];
  
  // console.log(pathname)
  // console.log(webpackConfig.entry[pathname])
  // console.log(webpackConfig.output.filename);

  let fileOut = path.resolve(__dirname, './dist/' + [pathname] + '/' + pathname.slice(pathname.lastIndexOf('/'))  + '.html');
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
  webpackConfig.plugins.unshift(plugin);
})


module.exports = webpackConfig;

