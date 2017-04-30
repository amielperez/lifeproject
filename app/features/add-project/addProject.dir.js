'use strict';

var addProject = () => {
  return {
    controller: 'addProjectCtrl',
    templateUrl: '/assets/html/features/add-project/addProject.tmpl.html',
    scope: {
      vm: '='
    }
  }
}

module.exports = addProject;
