'use strict';

var taskCtrl = ($scope) => {
  $scope.canBacktrack = $scope.vm['status_id'] > 0
  $scope.canProgress = $scope.vm['status_id'] < 2
}

module.exports = taskCtrl;
