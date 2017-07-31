/*
 * `plugins` module
 * ================
 *
 * General Webpack plugin configuration.
 */

'use strict';

const webpack = require('webpack');
const Dashboard = require('webpack-dashboard/plugin');
const HTML = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = () =>
  [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HTML({
      title: 'generator-phaser-plus@3 - CommonJS Template Project',
      template: './index.html'
    }),
    new Dashboard()
  ];