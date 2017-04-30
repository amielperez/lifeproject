'use strict';

var addTask = () => {
  return {
    templateUrl: '/assets/html/features/add-task/addTask.tmpl.html',
    controller: 'addTaskCtrl',
    scope: {
      vm: '=',
      vmproject: '='
    }
  }
}

module.exports = addTask;
