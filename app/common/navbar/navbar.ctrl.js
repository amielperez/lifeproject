'use strict';

var navbarCtrl = ($scope, $rootScope) => {
  $scope.onAddTask = () => {
    $rootScope.$broadcast('task:add')
  }
}

module.exports = navbarCtrl;
