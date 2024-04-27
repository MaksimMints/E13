const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: "production",
    output: {
        filename: 'main.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: false,
        port: 3001,
        client: {logging: 'error'},
        open: true
      },
    stats: 'errors-only',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: './src/index.pug',
            filename: './index.html'
        }),
        new TerserWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new ESLintPlugin(),
        new StylelintPlugin(),
    ],
    optimization:{
        minimize: true,
        minimizer: [ new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin()]
    },
    module: {
        rules: [
            {
                test:/.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
        ]
    }
}