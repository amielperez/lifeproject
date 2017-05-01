'use strict';

var _ = require('underscore')

var taskCtrl = ($scope) => {
  $scope.canBacktrack = !$scope.vm['is_start'] && !$scope.vm['is_complete']
  $scope.canProgress = !$scope.vm['is_complete']
  $scope.canDelete = !$scope.vm['is_complete']
  $scope.completed = $scope.vm['is_complete']

  $scope.canArchive = true
  $scope.progress = () => {
    var task = $scope.vm
    var project = $scope.vmproject
    var nextStatusIdx = getCurrentStatusIndex(project.statuses, task['status_id']) + 1
    if(task['status_id'] != project['ending_status'].id &&
      nextStatusIdx < project.statuses.length){
      task['status_id'] = $scope.vmproject.statuses[nextStatusIdx].id
      task.$update(() => {
        $scope.$emit("task:progress", $scope.vm)
      })
    }
  }

  $scope.backtrack = () => {
    var task = $scope.vm
    var project = $scope.vmproject
    var prevStatusIdx = getCurrentStatusIndex(project.statuses, task['status_id']) - 1
    if(task['status_id'] != project['starting_status'].id && prevStatusIdx >= 0){
      task['status_id'] = $scope.vmproject.statuses[prevStatusIdx].id
      task.$update(() => {
        $scope.$emit("task:backtrack", $scope.vm)
      })
    }
  }

  $scope.delete = () => {
    var task = $scope.vm
    task.deleted = true
    task.$update(() => {
      $scope.$emit("task:delete", $scope.vm)
    })
  }

  var getCurrentStatusIndex = (statuses, current_status_id) => {
    return _.findIndex(statuses, (status) => {
      return status.id === current_status_id
    })
  }
}

module.exports = taskCtrl;
