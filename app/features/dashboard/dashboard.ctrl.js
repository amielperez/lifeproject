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
      // then change to the last tab
      $scope.$watch('::projects', (newVal, oldVal, scope) => {
        console.log("current active", $scope.active)
        console.log("to be new active", $scope.projects.length - 1)
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
