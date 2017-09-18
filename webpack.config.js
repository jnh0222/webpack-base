const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		'entry': './entry.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
	    hot: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {presets: ['stage-2']}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: "css-loader",
							options: {sourceMap: true}
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
		new ExtractTextPlugin('style.css'),
		new webpack.HotModuleReplacementPlugin()
	]
};
