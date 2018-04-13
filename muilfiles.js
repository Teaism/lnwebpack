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

var pages = getEntry('./src/pages/**/*.html');

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
