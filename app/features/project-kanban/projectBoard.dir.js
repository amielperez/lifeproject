'use strict';

var projectBoard = () => {
  return {
    templateUrl: '/assets/html/features/project-kanban/projectBoard.tmpl.html',
    scope: {
      vm: '='
    },
    controller: 'projectBoardCtrl'
  }
}

module.exports = projectBoard;
