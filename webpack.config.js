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
            // {
            //     test: /\.js$/i, loader: 'script-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                query: {
                  'presets': ['latest', 'react']
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
                test: /\.less$/i,
                use: [
                  {
                    loader: 'style-loader',
                  },
                  {
                    loader: 'css-loader',
                  },
                  {
                    loader: 'less-loader',
                  },
                ],
            },
            {
              test: /\.(scss)$/,
              use: [{
                loader: 'style-loader', // inject CSS to page
              }, {
                loader: 'css-loader', // translates CSS into CommonJS modules
              }, {
                loader: 'postcss-loader', // Run post css actions
                options: {
                  plugins: function () { // post css plugins, can be exported to postcss.config.js
                    return [
                      require('precss'),
                      require('autoprefixer')
                    ];
                  }
                }
              }, {
                loader: 'sass-loader' // compiles SASS to CSS
              }]
            },
            {
                test: /\.sass$/i,
                use: [
                  {
                    loader: 'style!css!sass?sourceMap'
                  }
                ],
            },
            {
                test: /\.woff$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name]_[hash:8].[ext]"
            }, {
                test: /\.woff2$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[name]_[hash:8].[ext]"
            }, {
                test: /\.(eot|ttf)$/,
                loader: "file-loader?&name=[name]_[hash:8].[ext]"
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
                // use: [
                //   {
                //     loader: 'style-loader',
                //   },
                //   {
                //     loader: 'css-loader',
                //   },
                // ],
            },

        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[chunkhash].css',
            allChunks: true
        }),
        new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
            rootAssetPath: rootAssetPath,
            ignorePaths: ['/css', '/js']
        })
    ]
};
