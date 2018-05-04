const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
	entry: './entry.js',
	entry: {
		js_custom:'./entry.js',
		js_lib: ['jquery']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]_bundle_[hash].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {presets: ['es2015']}
				},
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
								minimize: true
							}
						},
						{
							loader: "sass-loader",
							options: {sourceMap: true}
						}
					]
				})
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist/*.*'),
		new ExtractTextPlugin('style_[contenthash].css'),
		new UglifyJSPlugin({
			test: /\.js$/,
			sourceMap: true,
			uglifyOptions: {
				compress: {
					drop_console: true
				}
			}
		}),
		new ManifestPlugin({
				fileName: 'manifest.json',
				basePath: './dist/'
			}),
		new webpack.ProvidePlugin({
			'window.jQuery'    : 'jquery',
			'window.$'         : 'jquery',
			'jQuery'           : 'jquery',
			'$'                : 'jquery'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'index.ejs'),
			minify: {
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true
			}
		})
	]
};
