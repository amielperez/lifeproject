'use strict'

var DashboardCtrl = ($scope, $rootScope, $uibModal, envService, taskFactory) => {
  $scope.tasks = taskFactory.query();

  $rootScope.$on('task:add', () => {
    openModal(...arguments);
  });

  var openModal = () => {
    $scope.task = {};
    var modalInstance = $uibModal.open({
      animation: true,
      template: "<add-task vm='task'></add-task>"
    });
    $rootScope.$on('task:added', (event, newTask) => {
      modalInstance.close(newTask)
      $scope.tasks.push(newTask)
      console.log("added task", newTask)
    })
  }
}

module.exports = DashboardCtrl;
