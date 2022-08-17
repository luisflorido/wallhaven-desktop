const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
    ],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: require('./rules.webpack'),
  },
};
