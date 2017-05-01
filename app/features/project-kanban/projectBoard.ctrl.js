'use strict';

var _ = require('underscore')
var ProjectBoardCtrl = ($scope, $rootScope, $uibModal, taskFactory) => {
  taskFactory.query({ project_id: $scope.vm.id }, (result) => {
    $scope.tasks = result
  })

  $scope.addTask = () => {
    $scope.openModal(...arguments)
  }

  $scope.$watch('tasks', () => {
    sortTasks()
  }, true)

  var sortTasks = () => {
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
    })

    $scope.$on('task:formDismissed', () => {
      modalInstance.close(newTask)
    })
  }

  $scope.$on('task:delete', (event, task) => {
    $scope.tasks.splice($scope.tasks.indexOf(task), 1)
  })
}

module.exports = ProjectBoardCtrl;
