const path = require('path');
const debug = require('debug')('app:config:project');
const argv = require('yargs').argv

debug('Creating default configuration');

const config = {
  env: process.env.NODE_ENV || 'development',

  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
  dir_test: 'tests',

  server_host: 'localhost',
  server_port: process.env.PORT || 3000,

  // Compiler Configuration
  compiler_babel: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0']
  },
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendors: [
    'react',
    'react-redux',
    'react-router',
    'redux'
  ],
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ]
};


config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env == 'development',
  '__PROD__': config.env == 'production',
  '__TEST__': config.env == 'test',
  '__COVERAGE__' : !argv.watch && config.env === 'test'
};


function base() {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

config.paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist)
};

module.exports = config;
