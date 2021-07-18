const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Копирование изображений, шрифтов, uploads итд
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Stylelint
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

// Проверка настройки
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './assets/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/index.bundle.js'
  },
  devtool: 'source-map',
  performance: {
    hints: false,
  },

  // DevServer
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
  },
  plugins: [
    new CleanWebpackPlugin(),

    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './assets/html/index.html',
      filename: 'index.html',
      minify: !isDev, // Disable minification during production mode
      hash: true,
    }),

    new HtmlWebpackPlugin({
      template: './assets/html/detail.html',
      filename: 'detail.html',
      minify: false, // Disable minification during production mode
      hash: true,
    }),

    new MiniCssExtractPlugin({
      filename: './css/styles.css'
    }),

    new StylelintWebpackPlugin({
      configFile: '.stylelintrc',
      // failOnError: false,
      emitWarning: true,
      // emitError: true
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets/images/',
          to: 'images/'
        },
      ],
    }),

  ],
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                ]
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath) => {
                console.log(url, resourcePath, 'resourcePath')
                if (/icon\.png|tile\.png|tile-wide\.png/.test(resourcePath)) {
                  return url
                } else {
                  return `images/${url}`
                }
              },
              name: '[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: process.env.NODE_ENV !== 'production', // Disable during development
              mozjpeg: {
                progressive: true,
                quality: 75
              },
            },
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /(favicon\.ico|site\.webmanifest|browserconfig\.xml|robots\.txt|humans\.txt)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      }
    ],
  }
}

