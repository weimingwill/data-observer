var webpack = require('webpack');
var path = require('path');

module.exports = {
	'entry': './src/index',
	'output': {
		'path': path.resolve(__dirname, 'dist'),
		'library': 'dataObserver',
		'filename': 'data-observer.js',
		'libraryTarget': 'umd'
	},
	module: {
		rules: [
			{
			  test: /\.js$/,
			  exclude: /(node_modules|bower_components)/,
			  use: {
			    loader: 'babel-loader',
			    options: {
			      presets: ['env']
			    }
			  }
			}
		]
	}
}