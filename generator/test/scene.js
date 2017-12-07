/*
 * Game state generator test suite.
 */

'use strict';

const chalk = require('chalk');
const assert = require('yeoman-assert');
const kebabCase = require('lodash.kebabcase');
const utils = require('../lib/utils');
const runGenerator = require('./fixtures/run-generator');

// User inputs.
const name = 'Test';
const description = 'A test game state.';
const methods = ['init', 'create', 'shutdown'];

// Expected file name of the create module.
const filename = utils.getModuleName('src', name);

// The states index module, that should be updated.
const statesIndex = 'src/scenes-index.js';

describe(chalk.bold.cyan('generator-phaser-plus:scene'), () => {
  describe('creates a ECMAScript module', () => {
    describe('with chosen methods', () => {
      it('using prompts', () =>
        runGenerator('scene', 'default')
          .withPrompts({name, description, methods})
          .then(checkCreatedModule)
          .then(checkUpdatedIndex));

      function checkCreatedModule() {
        assert.fileContent([
          [filename, `* ${description}`],
          [filename, `class ${name} extends Phaser.Scene {`],
          [filename, `init() {`],
          [filename, `create() {`],
          [filename, `shutdown() {`]
        ]);
        assert.noFileContent([
          [filename, `preload() {`],
          [filename, `update() {`],
          [filename, `render() {`]
        ]);
      }
    });

    describe('with default methods', () => {
      it('using prompts', () =>
        runGenerator('scene', 'default')
          .withPrompts({name, description})
          .then(checkCreatedModule)
          .then(checkUpdatedIndex));

      function checkCreatedModule() {
        assert.fileContent([
          [filename, `* ${description}`],
          [filename, `class ${name} extends Phaser.Scene {`],
          [filename, `create() {`],
          [filename, `update() {`]
        ]);
        assert.noFileContent([
          [filename, `init() {`],
          [filename, `preload() {`],
          [filename, `render() {`],
          [filename, `shutdown() {`]
        ]);
      }
    });

    function checkUpdatedIndex() {
      assert.fileContent([
        [statesIndex, `export {default as Nada} from './nada';`],
        [statesIndex, `export {default as ${name}} from './${kebabCase(name)}';`]
      ]);
    }
  });
});
