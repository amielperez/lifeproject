'use strict';

var dashboardCtrl = require('../features/dashboard/dashboard.ctrl');
var dashboardFactory = require('../features/dashboard/dashboard.fact')
var dashboard = require('../features/dashboard/dashboard.dir')

var task = require('../common/task/task.dir')

var navbar = require('../common/navbar/navbar.dir')

var registerToApp = (app) => {
  app.controller('dashboardCtrl', ['$scope', 'envService', 'dashboardFactory', dashboardCtrl])
  app.factory('dashboardFactory', ['$http', 'envService', dashboardFactory])
  app.directive('dashboard', [dashboard])
  app.directive('task', [task])
  app.directive('navbar', [navbar])
}

module.exports = registerToApp;
