const path = require("path")
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "src/index.js"),
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            //{
            //  "useBuiltIns": "entry"
            //},
            '@babel/preset-react',
          ],
        }
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: 'url-loader'
      }
    ]
  }
}