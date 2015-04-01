'use strict';

var sig = angular.module('signature', []);

sig.controller('signatureCtrl', ['$scope', function ($scope) {
    $scope.clearVal = 0;
    $scope.saveVal = 0;

    $scope.clear = function () {
        $scope.clearVal += 1; //On this value change directive clears the context
    };

    $scope.saveToImage = function () { 
        $scope.saveVal = 1; //On this value change directive saves the signature
    };
}]);

sig.directive('signatureDir', ['$document', '$log', '$rootScope', function ($document, $log, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var ctx = element[0].getContext('2d');

            ctx.canvas.width = window.innerWidth - 30;

            // the last coordinates before the current move
            var lastPt;

            function getOffset(obj) {
                return { left: 15, top: 116 }; //Got a fixed offset
            }

            attrs.$observe('value', function (newValue) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            });

            attrs.$observe('saveVal', function (newValue, dnid) {
                var imagedata = ctx.canvas.toDataURL();
                $rootScope.signatureTemp.push({'dnid':dnid, 'signature':imagedata});
            });

            element.on('touchstart', function (e) {
                e.preventDefault();
                ctx.fillRect(e.touches[0].pageX - getOffset(element).left, e.touches[0].pageY - getOffset(element).top, 2, 2);
                lastPt = { x: e.touches[0].pageX - getOffset(element).left, y: e.touches[0].pageY - getOffset(element).top };
            });
            element.on('touchmove', function (e) {
                e.preventDefault();
                if (lastPt !== null) {
                    ctx.beginPath();
                    ctx.moveTo(lastPt.x, lastPt.y);
                    ctx.lineTo(e.touches[0].pageX - getOffset(element).left, e.touches[0].pageY - getOffset(element).top);
                    ctx.stroke();
                }
                lastPt = { x: e.touches[0].pageX - getOffset(element).left, y: e.touches[0].pageY - getOffset(element).top };
            });

            element.on('touchend', function (e) {
                e.preventDefault();
                lastPt = null;
            });
        }
    };
}]);