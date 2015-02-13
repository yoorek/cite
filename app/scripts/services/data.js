'use strict';

/**
 * @ngdoc service
 * @name citeApp.configService
 * @description
 * # configService
 * Provider in the citeApp.
 */
angular.module('citeApp')

  .run(function ($interval, dataService) {
    dataService.start();
  })

  .provider('dataService', function () {

    // Private variables
    var _config;

    _config = {
      url: 'http://54.172.242.26:4000/',
      endpoint: 'cite',
      interval: 3
    };

    // Public API for configuration
    this.url = function (url) {
      _config.url = url;

      return this;
    };

    this.endpoint = function (endpoint) {
      _config.endpoint = endpoint;

      return this;
    };

    this.interval = function (interval) {
      _config.interval = interval;

      return this;
    };

    // Method for instantiating
    this.$get = function ($http, $rootScope, $interval) {
      var _api = {},
        _cache,
        _interval;

      _api.refresh = function refresh() {
        var promise;

        promise = $http
          .get(_config.url + _config.endpoint)
          .then(function (result) {
            $rootScope.$broadcast('data:refresh', result.data);

            _cache = result.data;

            return result;
          })
          .catch(function (error) {
            $rootScope.$broadcast('data:error', error);

            return error;
          });

        return promise;
      };

      _api.getConfig = function () {
        return _config;
      };

      _api.setConfig = function (config) {
        _config = config || _config;

        $rootScope.$broadcast('data:config', _config);
      };

      _api.start = function () {
        _interval = $interval(_api.refresh, _config.interval * 1000);
      };

      _api.stop = function () {
        $interval.cancel(_interval);
      };

      _api.getLastResult = function(){
        return _cache;
      };

      return _api;
    };
  });
