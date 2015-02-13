'use strict';

/**
 * @ngdoc overview
 * @name citeApp
 * @description
 * # citeApp
 *
 * Main module of the application.
 */
angular
  .module('citeApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toaster'
  ])
  .config(function ($routeProvider, dataServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/config', {
        templateUrl: 'views/config.html',
        controller: 'ConfigCtrl'
      })
      .when('/citebrowser', {
        templateUrl: 'views/citebrowser.html',
        controller: 'CitebrowserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    dataServiceProvider
      .url(' http://54.172.242.26:4000/')
      .endpoint('cite')
      .interval(3);
  })

  .run(function ($rootScope, toaster) {

    $rootScope.$on('data:error', function (event, error) {
      toaster.pop('error', 'Error', JSON.stringify(error));
    });

    $rootScope.$on('data:refresh', function () {
      toaster.pop('info', 'Data refresh annoying information', 'New quotation arrived - see it under Browser menu');
    });

    $rootScope.$on('data:config', function (event, config) {
      toaster.pop('success', 'Config changed', JSON.stringify(config));
    });

  });
