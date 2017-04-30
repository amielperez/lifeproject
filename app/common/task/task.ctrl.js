'use strict';

var taskCtrl = ($scope) => {
  $scope.canBacktrack = $scope.vm['status_id'] < 2 && $scope.vm['status_id'] > 0
  $scope.canProgress = $scope.vm['status_id'] < 2
  $scope.canDelete = $scope.vm['status_id'] < 2
  $scope.completed = $scope.vm['status_id'] === 2
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
