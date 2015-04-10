'use strict';

// Medicals controller
angular.module('children').controller('SignatureController', ['$scope', '$stateParams', '$location','$window', 'Notify', '$modal', '$log',
    function($scope, $stateParams, $location, $window, Notify, $modal, $log) {

        console.log(angular.element(document.getElementById('signature-pad')));
        $scope.canvas = angular.element(document.getElementById('signature-pad'))[0];
        //console.log($scope.canvas);
        //$scope.canvas.width = $scope.windowWidth * .8;
        //console.log($scope);
    }

]);
