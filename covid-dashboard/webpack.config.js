const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { ProvidePlugin, SourceMapDevToolPlugin, HotModuleReplacementPlugin } = require(
  'webpack',
);

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    bundle: './app.js',
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 5000,
    ignored: /node_modules/,
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    hot: true,
    open: true,
    inline: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'COVID-19 Dashboard',
      template: './template.ejs',
      filename: 'index.html',
    }),
    new ESLintPlugin(),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new HotModuleReplacementPlugin(),
    new ProvidePlugin({ L: 'leaflet', 'window.L': 'leaflet' }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        use: ['source-map-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(?:jpe?g|png)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(?:mp3|wav)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'audio/[name][ext]',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
    ],
  },
};
