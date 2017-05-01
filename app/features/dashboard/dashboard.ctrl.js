'use strict'

var DashboardCtrl = ($scope, $rootScope, $uibModal, envService, projectFactory) => {
  $scope.dashboardAlerts = []
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
      $scope.addDashboardAlert(`Project "${newProject.name}" successfully created.`, 'success')
      // One-time bind to wait for when projects get digested
      // That is the only time the last tab (new tab) will be activated
      $scope.$watch('::projects', (newVal, oldVal, scope) => {
        $scope.active = $scope.projects.length - 1
      }, true)
    })
  }

  $scope.$on('task:added', (event, task) => {
    $scope.addDashboardAlert(`Task "${task.summary}" successfully created.`, 'success')
  })

  $scope.addDashboardAlert = (message, type) => {
    type = type || 'info'
    $scope.dashboardAlerts.push({ message: message, type: type })
  }

  $scope.closeDashboardAlert = (index) => {
    $scope.dashboardAlerts.splice(index, 1)
  }
}

module.exports = DashboardCtrl;
