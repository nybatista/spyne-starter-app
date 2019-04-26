module.exports = (env)=>{
  const path = require('path');
  const webpack = require('webpack');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const miniCssPlugin = new MiniCssExtractPlugin({
    filename: 'css/main.css'
  });

  const cleanPlugin = new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['**/*','!.gitkeep'],
    cleanAfterEveryBuildPatterns: ['!.gitkeep']

  });
  const htmlPlugin = new HtmlWebpackPlugin({
    title: 'spyne-starter'
  });


  return {
    mode: 'development',

    entry: {

        index: "./src/js/index.js"
    },

    devtool: 'inline-source-map',

    devServer: {
      contentBase: './dist',
      publicPath: '/'
    },

    plugins: [miniCssPlugin, cleanPlugin, htmlPlugin],

    output: {
        filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: '../'
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader : 'file-loader',
              options: {
                name(file) {
                  console.log("FILE IS ",file);
                  let dir = String(file).includes('/imgs/') === true ? '/static/imgs/' : '/static/data/';
                  return dir+'[name].[ext]';
                }

              }
            } ]


        }/*,

        {
          test: /\.(json)$/,
          use: [
            {
              loader : 'file-loader',
              options: {
                name(file) {
                  console.log("FILE IS ",file);
                  let dir = String(file).includes('/imgs/') === true ? '/static/imgs/' : '/static/data/';
                  if (process.env.NODE_ENV === 'development') {
                    return  dir+'[name].[ext]';
                  }

                  return dir+'[name].[ext]';
                },
              }
            } ]


        }*/


      ]
    },


    resolve: {
      alias: {
        imgs: path.resolve(__dirname, 'src/static/imgs/'),
        data: path.resolve(__dirname, 'src/static/data/')

      },
    }

  }



};