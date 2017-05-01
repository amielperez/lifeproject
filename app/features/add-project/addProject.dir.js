'use strict';

var addProject = () => {
  return {
    controller: 'AddProjectCtrl',
    templateUrl: '/assets/html/features/add-project/addProject.tmpl.html',
    scope: {
      vm: '='
    }
  }
}

module.exports = addProject;
