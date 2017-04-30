'use strict'

var DashboardCtrl = ($scope, $rootScope, envService, projectFactory) => {
  $scope.projects = projectFactory.query();

  // $rootScope.$on('task:add', () => {
  //   openModal(...arguments);
  // });
}

module.exports = DashboardCtrl;
