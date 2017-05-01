'use strict';

var AddProjectCtrl = ($scope, projectFactory) => {
  $scope.saveProject = () => {
    projectFactory.save($scope.vm).$promise.then((savedResource) => {
      $scope.$emit('project:added', savedResource)
    })
  }
}

module.exports = AddProjectCtrl;
