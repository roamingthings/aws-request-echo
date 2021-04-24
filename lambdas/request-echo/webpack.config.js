// const webpack = require('webpack');
const path = require('path');
// const glob = require('glob');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const FileManagerPlugin = require('filemanager-webpack-plugin');

// Looks for lambdas functions within src directory and creates entry map
// for webpack config
// const lambdaEntries = glob.sync(path.join('.', 'lib', '**/index.js')).reduce(
//   (acc, lambdaPath) => ({
//     ...acc,
//     [`${path.basename(path.dirname(lambdaPath))}/index`]: `./${lambdaPath}`,
//   }),
//   {},
// );

/**
 * @type webpack.Configuration
 */
module.exports = {
  target: 'node',
  mode: 'development',
  entry: './lib/index.ts',
  devtool: 'source-map',
  externals: {
    'aws-sdk': 'aws-sdk',
    'pino-pretty': 'pino-pretty',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs',
  },
};
