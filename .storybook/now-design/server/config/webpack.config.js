import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import WatchMissingNodeModulesPlugin from './WatchMissingNodeModulesPlugin';
import fs from 'fs';
import {
  OccurenceOrderPlugin,
  includePaths,
  excludePaths,
  nodeModulesPaths,
  loadEnv,
  nodePaths,
} from './utils';
import babelLoaderConfig from './babel.js';

const packagesPath = path.join(__dirname, '../../../../packages');

// const fallbackPath = nodePaths.concat(fs.readdirSync(path.join(__dirname, '../../../../packages')).map((filename) => {
//     return path.join(packagesPath, filename);
// }));

const alias = {
  'now-design-ui': path.join(__dirname, '../../../now-design-ui'),
  '@now-design': path.join(__dirname, '../../../now-design'),
  '@kadira/storybook-addons': require.resolve('@kadira/storybook-addons'),
}; 

fs.readdir(packagesPath, (err, libs) => {
  let p = Promise.resolve();
  libs.map((libName) => {
      fs.readdir(path.join(packagesPath, libName), (err, moduleNames) => {
          moduleNames.map((moduleName) => {
              alias[moduleName] = path.join(packagesPath, libName, moduleName, 'src', 'index.js');
          })
      })
  })
})

export default function () {
  const config = {
    devtool: 'eval',
    entry: {
      manager: [
        require.resolve('./polyfills'),
        require.resolve('../../manager/index.js'),
      ],
      preview: [
        require.resolve('./polyfills'),
        require.resolve('./globals'),
        require.resolve('../../sandbox/entry.js'),
        `${require.resolve('webpack-hot-middleware/client')}?reload=true`,
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'static/[name].bundle.js',
      publicPath: '/',
      chunkFilename: 'static/[name].chunk.js',
    },
    plugins: [
      new webpack.DefinePlugin(loadEnv()),
      new OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new WatchMissingNodeModulesPlugin(nodeModulesPaths),
    ],
    module: {
      noParse: ['react/dist/react-with-addons.js','react-dom/dist/react-dom.js'],
      loaders: [{
          test: /\.jsx?$/,
          loader: require.resolve('babel-loader'),
          query: babelLoaderConfig,
          include: includePaths,
          exclude: excludePaths,
        }, {
          test: /\.js|jsx$/,
          exclude: /(node_modules)|(packages)/,
          loader: 'babel',
          query: {
            presets: ['react', ['es2015', {
              "loose": true
            }], 'stage-0'],
            plugins: ['syntax-dynamic-import']
          },
        }, {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        }, {
          test: /\.css$/,
          loaders: ["style", "css"]
        }, {
          test: /\.(png\?.*|jpg\?.*|jpg|png)$/,
          loader: 'url-loader'
        }, {
          test: /\.(blob|svg)$/,
          loader: 'file-loader'
        }, {
          test: /\.md$/,
          loader: 'raw-loader'
        }, {
          test: /\.json$/,
          loader: 'json'
        }
      ],
    },
    resolve: {
      // Since we ship with json-loader always, it's better to move extensions to here
      // from the default config.
      extensions: ['.js', '.json', '.jsx', ''],
      // Add support to NODE_PATH. With this we could avoid relative path imports.
      // Based on this CRA feature: https://github.com/facebookincubator/create-react-app/issues/253
      // fallback: fallbackPath,
      alias
    },
  };

  return config;
}
