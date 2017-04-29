'use strict';

var addTaskCtrl = ($scope, $rootScope, taskFactory) => {
  $scope.addTask = () => {
    taskFactory.save($scope.vm, () => {
      $rootScope.$broadcast('task:added', $scope.vm)
    })
  }
}

module.exports = addTaskCtrl;
