'use strict';

// TODO: can i create an 'index.js' under every feature and export everything as one?
// TODO: then register every component automagically?
var dashboardCtrl = require('../features/dashboard/dashboard.ctrl');
var dashboard = require('../features/dashboard/dashboard.dir')

var task = require('../common/task/task.dir')
var taskFactory = require('../common/task/task.fact')

var navbar = require('../common/navbar/navbar.dir')
var navbarCtrl = require('../common/navbar/navbar.ctrl')

var addTaskCtrl = require('../features/add-task/addTask.ctrl')
var addTask = require('../features/add-task/addTask.dir')

var projectFactory = require('../common/project/project.fact')
var projectBoardCtrl = require('../common/project/projectBoard.ctrl')
var projectBoard = require('../common/project/projectBoard.dir')

// TODO: checkout gulp-ng-annotate and this article https://github.com/mgol/grunt-ng-annotate
// TODO: to DRY up these injections
var registerToApp = (app) => {
  app.controller('dashboardCtrl', ['$scope', '$rootScope', 'envService', 'projectFactory', dashboardCtrl])
  app.directive('dashboard', [dashboard])
  app.directive('task', [task])
  app.directive('navbar', [navbar])
  app.controller('navbarCtrl', ['$scope', '$rootScope', navbarCtrl])
  app.controller('addTaskCtrl', ['$scope', '$rootScope', 'taskFactory', addTaskCtrl])
  app.directive('addTask', [addTask])
  app.factory('taskFactory', ['$resource', 'envService', taskFactory])
  app.factory('projectFactory', ['$resource', 'envService', projectFactory])
  app.controller('projectBoardCtrl', ['$scope', '$rootScope', '$uibModal', 'taskFactory', projectBoardCtrl])
  app.directive('projectBoard', [projectBoard])
}

module.exports = registerToApp;
