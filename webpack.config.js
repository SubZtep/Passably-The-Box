const
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  webpack = require('webpack')

module.exports = function(env, argv) {
  let conf = {
    entry: {
      main: path.resolve(__dirname, 'src/js/main.js'),
      vendor: ['babylonjs', 'oimo', 'cannon']
    },

    resolve: {
      enforceExtension: false,
      alias: {
        Engine: path.resolve(__dirname, 'src/js/engine/'),
        Scene: path.resolve(__dirname, 'src/js/scene/'),
        Objects: path.resolve(__dirname, 'src/js/objects/'),
        Classes: path.resolve(__dirname, 'src/js/classes/')
      }
    },

    module: {
      rules: [
        {
          test: /\.pug$/,
          use: 'pug-loader'
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pug/index.pug')
      }),
      new webpack.DefinePlugin({
        PRODUCTION: argv.mode === 'production'
      })
    ],

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
      //'[name]-[hash].js' (check for separated vendor hash)
    },

    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: 'all'
      }
    }
  }

  return conf
}
