import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import {
  OccurenceOrderPlugin,
  includePaths,
  excludePaths,
  loadEnv,
  nodePaths,
} from './utils';
import babelLoaderConfig from './babel.prod.js';

const fallbackPath = nodePaths.concat(fs.readdirSync(path.join(__dirname, '../../../../packages')).map((filename) => {
    return path.join(__dirname, '../../../../packages', filename);
}));

export default function () {
  const config = {
    bail: true,
    debug: false,
    devtool: '#cheap-module-source-map',
    entry: {
      manager: [
        require.resolve('./polyfills'),
        require.resolve('../../manager/index.js'),
      ],
      preview: [
        require.resolve('./polyfills'),
        require.resolve('./globals'),
        require.resolve('../../sandbox/entry.js'),
      ],
    },
    output: {
      filename: 'static/[name].[chunkhash].bundle.js',
      // Here we set the publicPath to ''.
      // This allows us to deploy storybook into subpaths like GitHub pages.
      // This works with css and image loaders too.
      // This is working for storybook since, we don't use pushState urls and
      // relative URLs works always.
      publicPath: '',
    },
    plugins: [
      new webpack.DefinePlugin(loadEnv({ production: true })),
      new OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: false,
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ],
    module: {
      loaders: [
        {
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
         }
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
      fallback: fallbackPath,
      alias: {
        // This is to add addon support for NPM2
        // 'react': 'react/dist/react-with-addons.js',
        // 'react-dom': 'react-dom/index.js',
        'now-design-ui': path.join(__dirname, '../../../now-design-ui'),
        '@now-design': path.join(__dirname, '../../../now-design')
      }
    },
  };

  return config;
}
