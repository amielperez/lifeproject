var angular = require('angular')
require('angular-mocks')

describe('TaskCtrl', () => {
  beforeEach(angular.mock.module('lifeProject'))

  var $controller
  var $rootScope
  var $scope

  beforeEach(angular.mock.inject((_$controller_, _$rootScope_) => {
	  $controller = _$controller_
    $rootScope = _$rootScope_
    $scope = _$rootScope_.$new()
    $scope.vm = {
      status_id: 0
    }
    $scope.vmproject = {
      ending_status: 0,
      starting_status: { id: 0 },
      ending_status: { id: 0 }
    }
	}));

  subject = () => $controller('TaskCtrl', { $scope: $scope })

  describe('.completed', () => {
    it('evals to true if status id points to the complete status', () => {
      $scope.vm['status_id'] = 1
      $scope.vmproject['ending_status'].id = 1
      subject()
      expect($scope.completed).toBe(true)
    })

    it('evals to false if status id points does not point to complete status', () => {
      $scope.vm['status_id'] = 1
      $scope.vmproject['ending_status'].id = 0
      subject()
      expect($scope.completed).toBe(false)
    })
  })

  describe('.canDelete', () => {
    it('evals to the opposite of $scope.completed', () => {
      $scope.completed = true
      subject()
      expect($scope.canDelete).toBe(!$scope.completed)
    })
  })

  describe('.canProgress', () => {
    it('evals to the opposite of $scope.completed', () => {
      $scope.completed = true
      subject()
      expect($scope.canProgress).toBe(!$scope.completed)
    })
  })

  describe('.canBacktrack', () => {
    it('evals to true if the status of the task is not the starting status, and it is not yet complete', () => {
      $scope.vm['status_id'] = 2
      $scope.vmproject['starting_status'].id = 1
      $scope.vmproject['ending_status'].id = 3
      subject()
      expect($scope.canBacktrack).toBe(true)
    })

    it('evals to false if the status of the task is the starting status', () => {
      $scope.vm['status_id'] = 1
      $scope.vmproject['starting_status'].id = 1
      subject()
      expect($scope.canBacktrack).toBe(false)
    })

    it('evals to false if the task is complete', () => {
      $scope.completed = true
      subject()
      expect($scope.canBacktrack).toBe(false)
    })
  })
})
