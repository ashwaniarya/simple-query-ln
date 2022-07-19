module.exports = {
  entry: {
    queryParser: './built/QueryParser.js',
    queryBuilder: './built/QueryBuilder.js',
    index:'./built/index.js'
  },
  output: {
    filename: "[name].js",
    path: __dirname + '/lib'
  }
}