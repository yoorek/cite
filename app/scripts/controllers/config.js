'use strict';

/**
 * @ngdoc function
 * @name citeApp.controller:ConfigCtrl
 * @description
 * # ConfigCtrl
 * Controller of the citeApp
 */
angular.module('citeApp')
  .controller('ConfigCtrl', function ($scope, dataService) {
    $scope.config = {};

    angular.extend($scope.config, dataService.getConfig());

    $scope.setConfig = function () {
      dataService.stop();
      dataService.setConfig($scope.config);
      dataService.start();
    };

  });
