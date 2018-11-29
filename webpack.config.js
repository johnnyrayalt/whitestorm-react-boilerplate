const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const alias = require('whs/tools/alias')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.jsx'),
    stylesheets: path.resolve(__dirname, 'src/stylesheets/index.css')
  },

  devtool: (mode === 'production') ? false : 'inline-source-map',
  mode: mode,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-transform-react-constant-elements",
              "@babel/plugin-transform-react-inline-elements",
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },

  plugins: [
      new CleanWebpackPlugin(['dist']),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        title: 'WhitestormJS + React Boilerplate',
        template: path.resolve(__dirname, 'src', 'index.jsx'),
        filename: './index.html',
        appMountId: 'app',
        inject: 'body',
        chunks: 'all',
        minify: true
      }),
      new HtmlWebpackInlineSourcePlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 1024,
        minRatio: 0.8
      })
  ],

  devServer: {
    publicPath: '/',
    stats: { chunks: true }
  },

  resolve: {
    alias
  },

  performance: {
    maxAssetSize: 249856
  },

  optimization: {
    runtimeChunk: 'single',
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      minSize: 0
    }
  },

  output: {
    filename: '[id].js',
    chunkFilename: '[id].js',
    path: path.resolve(__dirname, 'dist')
  }

}

function isExternal(module) {
  const userRequest = module.userRequest

  if (typeof userRequest !== 'string') {
    return false
  }

  return userRequest.indexOf('bower_components') >= 0 ||
         userRequest.indexOf('node_modules') >= 0 ||
         userRequest.indexOf('libraries') >= 0
}
