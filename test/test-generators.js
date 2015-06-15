'use strict';


var gulp = require('gulp');
var defineTestTask = require('./helpers/defineTestTask');


[ 'plugin', 'state' ]
  .forEach(function (generator) {
    require('./generators/' + generator + '-generator')(
      gulp,
      defineTestTask,
      require('../slushfile.js/generators/' + generator + '/task')
    );
  });
