'use strict';

var projectBoard = () => {
  return {
    templateUrl: '/assets/html/common/project/projectBoard.tmpl.html',
    scope: {
      vm: '='
    },
    controller: 'projectBoardCtrl'
  }
}

module.exports = projectBoard;
