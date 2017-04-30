'use strict';

var taskFactory = ($resource, envService) => {
  return $resource(
    `${envService.read('apiUrl')}/tasks/`,
    null,
    {
      query: {
        method: 'GET',
        isArray: true
      },
      update: {
        method: 'PUT'
      }
    }
  );
}

module.exports = taskFactory;
