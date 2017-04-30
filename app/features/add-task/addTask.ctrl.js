'use strict';

var addTaskCtrl = ($scope, $rootScope, taskFactory) => {
  $scope.vm['project_id'] = $scope.vmproject.id
  $scope.saveTask = () => {
    taskFactory.save($scope.vm).$promise.then((savedResource) => {
      console.log("Saved task resource")
      console.log(savedResource)
      $scope.$emit('task:added', savedResource)
    })
  }
}

module.exports = addTaskCtrl;
