const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const paths = require('./paths')
const { resolve } = require('path')

module.exports = (env) => {
  return {
    target: 'node',
    entry: {
      main: resolve(paths.server, 'index.js')
    },
    output: {
      path: paths.app,
      filename: '[name].js',
      publicPath: paths.static
    },

    externals: nodeExternals({
      modulesFromFile: true,
      whitelist: [
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|less|styl)$/,
      ]
    }),

    resolve: {
      extensions: ['.js'],
      alias: {
        '~': resolve(__dirname, '..')
      }
    },

    performance: {
      hints: false
    },
    node: {
      __filename: true,
      __dirname: true
    },

    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true
            }
          }]
        },

        {
          test: /\.(js)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                cacheDirectory: true
              }
            },
            'eslint-loader'
          ]
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: env,
        __DEV__: env === 'development'
      }),
      new FriendlyErrors({
        clearConsole: env === 'development',
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }
}
