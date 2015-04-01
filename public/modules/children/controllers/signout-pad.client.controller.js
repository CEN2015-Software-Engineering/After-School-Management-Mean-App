 'use strict';

angular.module('signature').controller('signatureCtrl', ['$scope', function ($scope, $log) {
    $scope.clearVal = 0;
    $scope.saveVal = 0;

    $scope.clear = function () {
        $scope.clearVal += 1; //On this value change directive clears the context
    };

    $scope.saveToImage = function () { 
        $scope.saveVal = 1; //On this value change directive saves the signature
    };
}]);
