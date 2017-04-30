'use strict'

var DashboardCtrl = ($scope, $rootScope, $uibModal, envService, projectFactory) => {
  $scope.projects = projectFactory.query();

  $scope.addProject = () => {
    $scope.openModal(...arguments)
  }

  $scope.openModal = () => {
    $scope.newProject = {}

    var modalInstance = $uibModal.open({
      animation: true,
      template: "<div class='modal-form'><add-project vm='newProject'></add-project></div>",
      scope: $scope
    });

    $scope.$on('project:added', (event, newProject) => {
      modalInstance.close(newProject)
      $scope.projects.push(newProject)
      delete $scope.newProject
      // TODO: Add a boostrap alert by emission
      console.log("added project", newProject)
    })
  }
}

module.exports = DashboardCtrl;
