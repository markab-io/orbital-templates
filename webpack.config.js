"use strict";
var webpack = require("webpack");
var path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = env => ({
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "lib"),
    filename: "orbital.js",
    publicPath: "/lib/",
    library: "orbital",
    libraryTarget: "umd",
    umdNamedDefine: true // Important
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "react"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "react-dom"
    },
    mobx: {
      commonjs: "mobx",
      commonjs2: "mobx",
      amd: "mobx",
      root: "mobx"
    },
    "mobx-react": {
      commonjs: "mobx-react",
      commonjs2: "mobx-react",
      amd: "mobx-react",
      root: "mobx-react"
    },
    "mobx-state-tree": {
      commonjs: "mobx-state-tree",
      commonjs2: "mobx-state-tree",
      amd: "mobx-state-tree",
      root: "mobx-state-tree"
    },
    moment: {
      commonjs: "moment",
      commonjs2: "moment",
      amd: "moment",
      root: "moment"
    }
  },
  optimization: {
    usedExports: true
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
        test: /\.(css|sass|scss)$/, //Check for sass or scss file names
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/,
        loader: "json-loader" //JSON loader
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      Templates: path.resolve(__dirname, "../orbital-templates/Material"),
      Orbital: path.resolve(__dirname, "./orbital"),
      Theme: path.resolve(__dirname, "./theme.js"),
      "@material-ui/styles": path.resolve("./node_modules/@material-ui/styles"),
      Config: env
        ? env.production
          ? path.resolve(__dirname, "./config/prod.js")
          : path.resolve(__dirname, "./config/qa.js")
        : path.resolve(__dirname, "./config/index.js")
      // "@markab.io/react": path.resolve(
      //   __dirname,
      //   "../../../../react-services/lib/react-services.js"
      // )
    }
  },
  plugins: [new BundleAnalyzerPlugin()],
  //To run development server
  devServer: {
    contentBase: __dirname
  }
});

