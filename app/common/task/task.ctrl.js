'use strict';

var taskCtrl = ($scope) => {
  $scope.canBacktrack = !$scope.vm['is_start'] && !$scope.vm['is_complete']
  $scope.canProgress = !$scope.vm['is_complete']
  $scope.canDelete = !$scope.vm['is_complete']
  $scope.completed = $scope.vm['is_complete']

  $scope.canArchive = true
  $scope.onProgress = () => {
    $scope.$emit("task:progress", $scope.vm)
  }

  $scope.onBacktrack = () => {
    $scope.$emit("task:backtrack", $scope.vm)
  }

  $scope.onDelete = () => {
    $scope.$emit("task:delete", $scope.vm)
  }
}

module.exports = taskCtrl;
