const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src1/index.js',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: '[name].[hash].js',
    chunkFilename: 'chunk.[chunkHash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    }),
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    inline: true,
    port: 9000,
    open: false,
    hotOnly: true,
    compress: true,
  },
  devtool: 'source-map',
};
