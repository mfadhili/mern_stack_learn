const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()
const config = {
    name: "browser",
    mode: "development",// e sets process.env.NODE_ENV default is production
    devtool: 'eval-source-map',//generating source maop
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ], //where entry file starts bundling  ie main.js
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'), // outpit bundled code
        filename: 'bundle.js',
        publicPath: '/dist/' // path for app assets
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'] // transpilation tool 
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//enables hot module replacemen
        new webpack.NoEmitOnErrorsPlugin() // skipping emitting on errors
    ],
    resolve: {
        alias: {
        'react-dom': '@hot-loader/react-dom' // add a Webpack alias to point react-dom
        }
    }
};
module.exports = config