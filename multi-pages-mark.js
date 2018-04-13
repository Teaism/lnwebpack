/*!
* @Author: Administrator
* @Date:   2018-04-13 19:23:25
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-13 19:26:05
*/


// 获取指定路径下的入口文件并引入模版编译后输出
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









/*
其他方法
//  one method

// 获取指定路径下的入口文件

function getEntry(globPath) {
  var entries = {},basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  return entries;
}

var pages = getEntry('./src/pages/d**d/*.html');

for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true,              // js插入位置
    minify: {
      //removeComments: true,
      //collapseWhitespace: true,
      //removeAttributeQuotes: true
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  };

  if (pathname in module.exports.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = true;
  }

  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
*/





// 获取指定路径下的入口文件
/*function getEntry(globPath) {
  var entries = {};
  glob.sync(globPath).forEach(function(filepath) {
    // 取倒数第二层(pages下面的文件夹)做包名
    var splitArr = filepath.split('/');
    var pathname = splitArr[splitArr.length - 2];
    entries[pathname] =  filepath;
     });
     return entries;
}
*/

// 获取指定路径下的入口文件
/*function getEntry(globPath) {
  var entries = {},basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  return entries;
}
*/
