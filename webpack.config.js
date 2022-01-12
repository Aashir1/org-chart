const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(relatedPath) {
	return path.join(__dirname, relatedPath);
}

const webpackConfigBase = {
	devtool: 'source-map',
	entry: {
		jazzcash: [ './src/index.jsx' ]
	},
	output: {
		path: resolve('./dist'),
		filename: '[name].[hash:4].js',
		chunkFilename: 'chunks/[name].[hash:4].js',
		publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:5051' : 'http://localhost:5051'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
				exclude: /node_modules/,
				include: [ resolve('./public') ],
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.(jpg|png)$/,
				use: {
					loader: 'url-loader'
				}
			},
			{
				test: /\.(gif)$/,
				use: {
					loader: 'file-loader'
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash:8].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// only enable hot in development
							hmr: process.env.NODE_ENV === 'development',
							// if hmr does not work, this is a forceful method.
							reloadAll: true
						}
					},
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		]
	},
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			minChunks: 3
		}
	},
	plugins: [
		// new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|sk/),
		new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /en|sk/),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new HtmlWebPackPlugin({
			template: './public/index.html',
			filename: './index.html',
			favicon: './public/favicon.ico'
		})
	]
};

module.exports = webpackConfigBase;
