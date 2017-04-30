'use strict';

var addProjectCtrl = ($scope, projectFactory) => {
  console.log($scope)
  $scope.saveProject = () => {
    projectFactory.save($scope.vm).$promise.then((savedResource) => {
      $scope.$emit('project:added', savedResource)
    })
  }
}

module.exports = addProjectCtrl;
