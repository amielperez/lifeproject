'use strict'

var DashboardCtrl = ($scope, envService, dashboardFactory) => {
  dashboardFactory.tasks().then((response) => {
    $scope.tasks = response.data;
    $scope.$apply();
  })
}

module.exports = DashboardCtrl;
