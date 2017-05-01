'use strict';

var DashboardCtrl = require('../features/dashboard/dashboard.ctrl');
var dashboard = require('../features/dashboard/dashboard.dir')

var task = require('../common/task/task.dir')
var taskFactory = require('../common/task/task.fact')
var TaskCtrl = require('../common/task/task.ctrl')

var navbar = require('../common/navbar/navbar.dir')
var NavbarCtrl = require('../common/navbar/navbar.ctrl')

var AddTaskCtrl = require('../features/add-task/addTask.ctrl')
var addTask = require('../features/add-task/addTask.dir')

var projectFactory = require('../common/project/project.fact')
var ProjectBoardCtrl = require('../features/project-kanban/projectBoard.ctrl')
var projectBoard = require('../features/project-kanban/projectBoard.dir')

var addProject = require('../features/add-project/addProject.dir')
var AddProjectCtrl = require('../features/add-project/addProject.ctrl')

var registerToApp = (app) => {
  app.controller('DashboardCtrl', ['$scope', '$rootScope', '$uibModal', 'envService', 'projectFactory', DashboardCtrl])
  app.controller('ProjectBoardCtrl', ['$scope', '$rootScope', '$uibModal', 'taskFactory', ProjectBoardCtrl])
  app.controller('NavbarCtrl', ['$scope', '$rootScope', NavbarCtrl])
  app.controller('AddTaskCtrl', ['$scope', '$rootScope', 'taskFactory', AddTaskCtrl])
  app.controller('TaskCtrl', ['$scope', TaskCtrl])
  app.controller('AddProjectCtrl', ['$scope', 'projectFactory', AddProjectCtrl])

  app.directive('dashboard', [dashboard])
  app.directive('task', [task])
  app.directive('navbar', [navbar])
  app.directive('addTask', [addTask])
  app.directive('projectBoard', [projectBoard])
  app.directive('addProject', [addProject])

  app.factory('taskFactory', ['$resource', 'envService', taskFactory])
  app.factory('projectFactory', ['$resource', 'envService', projectFactory])
}

module.exports = registerToApp;
