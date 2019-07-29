const slsw = require('serverless-webpack')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const manifestPath = path.resolve(__dirname, 'dist/manifest.json')
const { isLocal } = slsw.lib.webpack

const waitUntilFileExists = (filePath, timeout = 30000) =>
  new Promise((resolve, reject) => {
    let intervalHandle
    let timeoutHandle

    setInterval(() => {
      if (fs.existsSync(manifestPath)) {
        clearInterval(intervalHandle)
        clearTimeout(timeoutHandle)
        resolve()
      }
    }, 1000)

    setTimeout(() => {
      clearInterval(intervalHandle)
      clearTimeout(timeoutHandle)
      reject()
    }, timeout)
  })

module.exports = (async function() {
  const config = {
    entry: {
      ...slsw.lib.entries,
      'dummy-entry-to-force-reload-when-manifest-updates': manifestPath,
    },
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    externals: [
      /aws-sdk/, // available on AWS Lambda
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.esm'],
    },
    module: {
      rules: [
        {
          test: /\.(m?jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { node: '10.15' }, // Node version on AWS Lambda
                    useBuiltIns: 'usage',
                    modules: false,
                    loose: true,
                    corejs: '3',
                  },
                ],
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
            },
          },
        },
      ],
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   __ASSET_MANIFEST__: webpack.DefinePlugin.runtimeValue(
      //     () => JSON.stringify(require(manifestPath)),
      //     [manifestPath],
      //   ),
      // }),
      new webpack.DefinePlugin({
        __ASSET_MANIFEST__: isLocal ? '""' : JSON.stringify(require(manifestPath)),
        __ROOT_DIR__: JSON.stringify(path.resolve(__dirname)),
      }),
    ],
    stats: slsw.lib.webpack.isLocal
      ? { all: false, modules: true, maxModules: 0, errors: true, warnings: true, colors: true }
      : { colors: true },
  }

  // in dev mode make sure client assets are written before (TODO: is this actually needed? This will rebuild anyway..)
  if (isLocal) await waitUntilFileExists(manifestPath)

  return config
})()
