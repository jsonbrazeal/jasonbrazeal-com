var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var rootAssetPath = './jasonbrazeal_com/assets';

module.exports = {
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
        path: __dirname + '/build/assets/',
        publicPath: 'http://localhost:8000/assets/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    devServer: {
      contentBase: __dirname + '/build/',
      // compress: true,
      port: 8000,
      // go to http://localhost:8000 for development
      // this proxy setting will forward requests to the flask dev server
      proxy: {
        '/': {
         target: 'http://localhost:5000',
         // pathRewrite: {'^/api' : ''}
        }
      }
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                query: {
                  'presets': ['env', 'react']
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
                    name: "[name].[ext]"
                  }
                }
              ]
            },
            // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
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
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                  },
                ],
            },

        ]
    },
    plugins: [
        new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
            rootAssetPath: rootAssetPath,
            ignorePaths: ['/css', '/js']
        })
    ]
};
