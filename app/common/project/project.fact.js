'use strict';

var projectFactory = ($resource, envService) => {
  return $resource(
    `${envService.read('apiUrl')}/projects`,
    null,
    {
      query: {
        method: 'GET',
        isArray: true
      }
    }
  );
}

module.exports = projectFactory;
