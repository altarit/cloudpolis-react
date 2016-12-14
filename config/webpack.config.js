const webpack = require('webpack');
const debug = require('debug')('app:config:webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const project = require('./project.config');

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: project.compiler_devtool,
  resolve: {
    root: project.paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: []
  }
};

const APP_ENTRY = project.paths.client('index.jsx');

webpackConfig.entry = {
  app: [APP_ENTRY],
  vendor: project.compiler_vendors
};

webpackConfig.output = {
  filename: `[name].[${project.compiler_hash_type}].js`,
  path: project.paths.dist(),
  publicPath: project.compiler_public_path
};

webpackConfig.plugins = [
  new webpack.DefinePlugin(project.globals),
  new HtmlWebpackPlugin({
    template: project.paths.client('index.html'),
    hash: false,
    //favicon: project.paths.public('favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
];

webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  })
);


webpackConfig.module.loaders.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: project.compiler_babel
}, {
  test: /\.json$/,
  loader: 'json'
});


module.exports = webpackConfig;
