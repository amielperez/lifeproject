'use strict';

var _ = require('underscore')
var projectBoardCtrl = ($scope, $rootScope, $uibModal, taskFactory) => {
  taskFactory.query({ project_id: $scope.vm.id }, (result) => {
    $scope.tasks = result
    $scope.sortTasks($scope.tasks)
  })

  $scope.onAddTask = () => {
    $scope.openModal(...arguments)
  }

  $scope.sortTasks = (tasks) => {
    delete $scope.tasksByStatus
    $scope.tasksByStatus = {
      'todo': [], 'wip': [], 'done': []
    }
    console.log('moo')
    _.each(tasks, (task) => {
      console.log("evalling task")
      if(task['status_id'] === 0){
        console.log("todo")
        $scope.tasksByStatus['todo'].push(task)
      }else if(task['status_id'] === 1){
        console.log("wip")
        $scope.tasksByStatus['wip'].push(task)
      }else if(task['status_id'] === 2){
        console.log("done")
        $scope.tasksByStatus['done'].push(task)
      }else {
        console.log("uncat")
      }
    })
  }

  //
  console.log($scope)
  // $scope.$watch('tasks', (newVal, oldVal, scope) => {
  //   sortTasks($scope.tasks)
  // }, true)

  $scope.openModal = () => {
    $scope.newTask = {}
    $scope.taskProject = $scope.vm

    var modalInstance = $uibModal.open({
      animation: true,
      template: "<add-task vm='newTask' vmproject='taskProject'></add-task>",
      scope: $scope
    });

    $scope.$on('task:added', (event, newTask) => {
      modalInstance.close(newTask)
      $scope.tasks.push(newTask)
      console.log("added task", newTask)
    })

    $scope.$on('task:formDismissed', () => {
      modalInstance.close(newTask)
    })
  }
}

module.exports = projectBoardCtrl;
