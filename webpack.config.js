var webpack = require('webpack');
var path = require('path');

console.log("process.env.NODE_ENV = ", process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production'

module.exports = {
	devtool: isProduction ? null : "inline-sourcemap",
	entry: ['babel-polyfill', './src/main.js'],
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'app.bundle.js',
		publicPath: 'lib'
	},
	resolve: {
		alias: {
			opencell: path.resolve(__dirname, 'src'),
			api: path.resolve(__dirname, 'src/opencell/api'),
			framework: path.resolve(__dirname, 'src/opencell/framework'),
			models: path.resolve(__dirname, 'src/opencell/models'),
			modules: path.resolve(__dirname, 'src/opencell/modules'),
			common: path.resolve(__dirname, 'src/opencell/pages/common'),
			layout: path.resolve(__dirname, 'src/opencell/pages/layout'),
			protected: path.resolve(__dirname, 'src/opencell/pages/protected'),
			public: path.resolve(__dirname, 'src/opencell/pages/public')
		}
	},
	module: {
		loaders: [{
			test: [/\.jsx$/, /\.js$/],
			include: path.resolve(__dirname, 'src'),
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015', 'stage-0'],
				plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
			}
		}],
		plugins: isProduction  ? [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.UglifyJsPlugin({
				drop_console: true,
				compress: {
					warnings: true
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.OccurenceOrderPlugin()
		] : []
	}
};