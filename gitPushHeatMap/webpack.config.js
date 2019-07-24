const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/heatmap.js',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};