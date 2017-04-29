'use strict'

var angular = require('angular');
var config = require('./config/config')
var registry = require('./config/registry')

require('angular-environment');
require('angular-ui-bootstrap');
require('angular-resource');

var app = angular.module(
  'driven',
  [
    'environment',
    'ui.bootstrap',
    'ngResource'
  ]
);

app.config(config);
registry(app)
