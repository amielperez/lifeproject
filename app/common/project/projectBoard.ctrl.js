'use strict';

var _ = require('underscore')
var projectBoardCtrl = ($scope, $rootScope, $uibModal, taskFactory) => {
  taskFactory.query({ project_id: $scope.vm.id }, (result) => {
    $scope.tasks = result
    $scope.sortTasks()
  })

  $scope.onAddTask = () => {
    $scope.openModal(...arguments)
  }

  // TODO: maybe replace with a watcher
  $scope.sortTasks = () => {
    delete $scope.tasksByStatus
    $scope.tasksByStatus = {}
    _.each($scope.tasks, (task) => {
      var statusName = task['status_name']
      if(!$scope.tasksByStatus[statusName]){
        $scope.tasksByStatus[statusName] = []
      }
      $scope.tasksByStatus[statusName].push(task)
    })
  }

  $scope.getTasksByStatus = (status) => {
    if($scope.tasksByStatus){
      return $scope.tasksByStatus[status]
    }
  }

  $scope.openModal = () => {
    $scope.newTask = {}
    $scope.taskProject = $scope.vm

    var modalInstance = $uibModal.open({
      animation: true,
      template: "<div class='modal-form'><add-task vm='newTask' vmproject='taskProject'></add-task></div>",
      scope: $scope
    });

    $scope.$on('task:added', (event, newTask) => {
      modalInstance.close(newTask)
      $scope.tasks.push(newTask)
      console.log("added task", newTask)
      console.log($scope.tasks)
      $scope.sortTasks()
    })

    $scope.$on('task:formDismissed', () => {
      modalInstance.close(newTask)
    })
  }

  $scope.progress = (task) => {
    if(task['status_id'] < 2){
      task['status_id']++
      $scope.updateTask(task)
    }
  }

  $scope.backtrack = (task) => {
    if(task['status_id'] > 0) {
      task['status_id']--
      $scope.updateTask(task)
    }
  }

  // TODO: Move updating the task to itself because a task needs
  // to be able to take care of itself
  // However, probably do this when you've cleaned up the status codes hardcoding
  $scope.updateTask = (task) => {
    task.$update((res) => {
      console.log(res)
      $scope.sortTasks()
    })
  }

  $scope.$on('task:progress', (event, task) => {
    $scope.progress(task)
  })

  $scope.$on('task:backtrack', (event, task) => {
    $scope.backtrack(task)
  })

  $scope.$on('task:delete', (event, task) => {
    task['deleted'] = true
    taskFactory.update(task, () => {
      $scope.tasks.splice($scope.tasks.indexOf(task), 1)
      $scope.sortTasks()
    })
  })
}

module.exports = projectBoardCtrl;
