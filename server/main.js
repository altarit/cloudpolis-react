const express = require('express');
const debug = require('debug')('app:server');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const project = require('../config/project.config');
const compress = require('compress');
const connectHistoryApiFallback = require('connect-history-api-fallback');

const app = express();

app.use(connectHistoryApiFallback());
//app.use(compress());

if (project.env === 'development') {
  const compiler = webpack(webpackConfig);


  debug('Enabling webpack dev and HMR middleware');
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }));
  app.use(require('webpack-hot-middleware')(compiler));

  app.use(express.static(project.paths.public()));
} else {
  debug('HMR only for development mode');
  app.use(require('webpack-hot-middleware')(compiler));
}

module.exports = app;
