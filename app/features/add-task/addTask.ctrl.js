'use strict';

var addTaskCtrl = ($scope, $rootScope, taskFactory) => {
  $scope.vm['project_id'] = $scope.vmproject.id
  $scope.addTask = () => {
    taskFactory.save($scope.vm, () => {
      $scope.$emit('task:added', $scope.vm)
    })
  }
}

module.exports = addTaskCtrl;
