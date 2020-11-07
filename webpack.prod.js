// var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

var rootAssetPath = './jasonbrazeal_com/ui';
// const getLocalIdent = require('css-loader/lib/getLocalIdent');

module.exports = (env) => {
  console.log('creating production ui build for', env.HOST, '...');

  return {
    mode: 'production',
    // context: __dirname,
    entry: {
        app: [
            rootAssetPath + '/js/main.js'
        ],
    },
    output: {
        path: __dirname + '/nginx/build/',
        publicPath: 'https://' + env.HOST + '/', // trailing slask required
        filename: '[name].[contenthash].js',
    },
    // Automatically resolve certain extensions.
    // which is what enables users to leave off the extension when importing:

    // import File from '../path/to/file';

    // Using this will override the default array, meaning that webpack will no longer try to resolve modules using the default extensions. For modules that are imported with their extension, e.g. import SomeFile from "./somefile.ext", to be properly resolved, a string containing "*" must be included in the array.
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
              test: /\.js[x]?$/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              },
              exclude: /node_modules/
            },
            {
              test: /\.(pdf)(\?.*)?$/,
              loader: 'file-loader',
              options: {
                name: '[name]_[hash:8].[ext]'
              }
            },
            {
              test: /\.(jpe?g|png|gif|svg([\?]?.*))$/i,
              exclude: /(favicon|browserconfig|webmanifest|mstile|apple\-touch|android\-chrome|safari\-pinned)/,
              use: [
                'file-loader?&name=[name]_[hash:8].[ext]',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      optipng: {
                        optimizationLevel: 7,
                      }
                    }
                  }
                ]
            },
            {
              test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
              use: [
                {
                  loader: "file-loader",
                  options: {
                    name: "[name]_[hash:8].[ext]"
                  }
                }
              ]
            },
            {
              test: /\.css$/i,
              use: [
                {
                  loader: 'style-loader',
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: "[name]__[local]___[hash:base64:5]",
                    },
                    importLoaders: 1,
                    // getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                    //   // include modules here that need to be loaded as global css, i.e. without
                    //   // all class names as localIdentName
                    //   return loaderContext.resourcePath.includes('prism') ?
                    //     localName :
                    //     getLocalIdent(loaderContext, localIdentName, localName, options);
                    // }
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: [
                      require('autoprefixer'),
                      require('postcss-icss-keyframes')
                    ]
                  }
                }
              ],
            },

        ] // rules
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
        {
          from: rootAssetPath + '/error/*',
          flatten: true,
          globOptions: {
            ignore: ['.git/**']
          }
        },
        {
          from: rootAssetPath + '/icon/*',
          flatten: true,
          globOptions: {
            ignore: ['.git/**']
          }
        },
        {
          from:  '/Users/jsonbrazeal/Drive/Dev/web/jasonbrazeal.com-1.0.0-deploy/',
          to: __dirname + '/nginx/build/v1/',
          globOptions: {
            ignore: ['.git/**']
          }
        },
      ]
      }), // new CopyWebpackPlugin
    ] // plugins
}; // return
}; // module.exports = (env) => {
