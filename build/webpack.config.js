"use strict";
var webpack = require("webpack");
var path = require("path");
module.exports = env => {
  console.log("env", env);
  //entries
  let config = {
    entry: {
      main: "./Material/index.js"
    },
    output: {
      path: path.join(__dirname, "lib"),
      chunkFilename: "[name].bundle.js",
      filename: "[name]",
      libraryTarget: "umd",
      umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /\.js$/, //Check for all js files
          use: [
            {
              loader: "babel-loader",
              options: { babelrcRoots: [".", "../"] }
            }
          ],
          exclude: /(node_modules|bower_compontents)/
        },
        {
          test: /\.jsx$/, //Check for all js files
          use: [
            {
              loader: "babel-loader",
              options: { babelrcRoots: [".", "../"] }
            }
          ],
          exclude: /(node_modules|bower_compontents)/
        },
        {
          test: /\.(css|sass|scss)$/, //Check for sass or scss file names
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                publicPath:
                  env && env.production ? "/playground/dist/" : "dist/"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true // webpack@2.x and newer
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        Theme: path.resolve(__dirname, "./theme.js"),
        Config: env
          ? env.production
            ? path.resolve(__dirname, "./config/prod.js")
            : path.resolve(__dirname, "./config/qa.js")
          : path.resolve(__dirname, "./config/index.js"),
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
      }
    },
    externals: {
      // Don't bundle react or react-dom
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM"
      }
    },
    //To run development server
    devServer: {
      contentBase: __dirname
    }
  };
  return config;
};