const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const IS_PROD = process.env.NODE_ENV === 'production'
const DEV_PORT = 9000
const BACKEND_PORT = 3000
const publicPath = '/assets/'

module.exports = {
  entry: {
    'show-notes-client': './src/show-notes-client.tsx',
  },
  target: 'web',
  mode: IS_PROD ? 'production' : 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name]-[hash].js',
    chunkFilename: 'js/[name]-[id]-[chunkhash].js',
    publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(m?jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new WebpackAssetsManifest({
      writeToDisk: true,
      publicPath: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    writeToDisk: true, // needed for assets manifest
    compress: true,
    port: DEV_PORT,
    // liveReload: false, // disable for now
    proxy: {
      '/': {
        target: `http://localhost:${BACKEND_PORT}`,
      },
    },
  },
  stats: IS_PROD ? 'normal' : 'minimal',
}
