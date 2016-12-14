const webpack = require('webpack');
const debug = require('debug')('app:config:webpack');
const cssnano = require('cssnano');
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
  app : __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
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


if (__DEV__) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    })
  );
}



// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  );
}


// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: project.compiler_babel
}, {
  test: /\.json$/,
  loader: 'json'
});


// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

webpackConfig.module.loaders.push({
  test    : /\.scss$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
});
webpackConfig.module.loaders.push({
  test    : /\.css$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
});

webpackConfig.sassLoader = {
  includePaths : project.paths.client('styles')
};

webpackConfig.postcss = [
  cssnano({
    autoprefixer : {
      add      : true,
      remove   : true,
      browsers : ['last 2 versions']
    },
    discardComments : {
      removeAll : true
    },
    discardUnused : false,
    mergeIdents   : false,
    reduceIdents  : false,
    safe          : true,
    sourcemap     : true
  })
];

// File loaders
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)




module.exports = webpackConfig;
