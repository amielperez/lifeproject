'use strict';

var dashboardFactory = ($http, envService) => {
  return {
    tasks: () => {
      return new Promise((resolve, reject) => {
        $http.get(`${envService.read('apiUrl')}/tasks`)
          .then((response) => {
            resolve(response);
          }, (response) => {
            reject(response);
          })
      })
    }
  }
};

module.exports = dashboardFactory;
