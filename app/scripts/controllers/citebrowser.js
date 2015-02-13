'use strict';

/**
 * @ngdoc function
 * @name citeApp.controller:CitebrowserCtrl
 * @description
 * # CitebrowserCtrl
 * Controller of the citeApp
 */
angular.module('citeApp')

  .controller('CitebrowserCtrl', function ($scope) {

    $scope.authors = {
      Geralt: {title: 'Geralt', image: 'http://54.172.242.26:4000/geralt.png'},
      Jaskier: {title: 'Jaskier', image: 'http://54.172.242.26:4000/jaskier.png'},
      Yennefer: {title: 'Yennefer', image: 'http://54.172.242.26:4000/yennefer.png'}
    };

    $scope.$on('data:refresh', function (event, data) {
      $scope.quotation = data.cite;

      angular.forEach($scope.authors, function(author){
        author.active = false;
      });

      $scope.authors[data.who].active = true;
    });

  })

  .directive('errSrc', function () {
    return {
      link: function (scope, element, attrs) {
        scope.$watch(function () {
          return attrs.ngSrc;
        }, function (value) {
          if (!value) {
            element.attr('src', attrs.errSrc);
          }
        });

        element.bind('error', function () {
          element.attr('src', attrs.errSrc);
        });
      }
    };
  });

