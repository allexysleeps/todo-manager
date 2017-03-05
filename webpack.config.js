var webpack = require('webpack');
var path = require('path');
var debug = process.env.NODE_ENV !== "production";

module.exports = {
	context: `${__dirname}/app/client/dev/`,
	entry: `./js/TodoManager.js`,
	output: {
		path: `${__dirname}/app/client/prod`,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				},
			},
			{
				test: /\.sass$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	}
}