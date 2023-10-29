const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

/*

 module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
   output: {
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
*/

module.exports = {
    entry: {
        index: './src/index.js',
        physics: './src/physics/main.js',
        render: './src/render/main.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        static: ['dist']
    },
    devtool: 'eval-source-map', // enable: generate source maps
    plugins: [
        new ESLintPlugin(),
        new CleanWebpackPlugin({
            verbose: true // optional
        }),
        new HtmlWebpackPlugin({
            title: 'node',
            template: './src/index.html',
            inject: 'body'
        })
    ],
    module: {
        rules: [
            { 
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(gif|png|avif|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
        ]
    }
};