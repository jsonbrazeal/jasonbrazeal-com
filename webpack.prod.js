// var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var rootAssetPath = './jasonbrazeal_com/ui';
const getLocalIdent = require('css-loader/lib/getLocalIdent');

module.exports = env => {
  console.log('creating production ui build for', env.HOST, '...');

  return {
    mode: 'production',
    // context: __dirname,
    entry: {
        app: [
            rootAssetPath + '/js/main.js'
        ],
        // app_css: [
        //     rootAssetPath + '/css/main.css'
        // ]
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
                query: {
                  'presets': ['@babel/preset-env', '@babel/preset-react']
                },
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg([\?]?.*))$/i,
                use: [
                    'file-loader?&name=[name]_[hash:8].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ],
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
                      modules: true,
                      importLoaders: 1,
                      localIdentName: '[name]__[local]___[hash:base64:5]',
                      getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                        // include modules here that need to be loaded as global css, i.e. without
                        // all class names as localIdentName
                        return loaderContext.resourcePath.includes('prism') ?
                          localName :
                          getLocalIdent(loaderContext, localIdentName, localName, options);
                      }
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

        ]
    },
    plugins: [
    ]
}; // return
}; // module.exports = env => {
