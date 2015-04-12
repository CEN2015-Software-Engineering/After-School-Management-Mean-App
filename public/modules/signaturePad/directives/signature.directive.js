'use strict';

angular.module('children').directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {

            return {
                'h': w[0].innerHeight,
                'w': w[0].innerWidth
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            scope.canvas = angular.element(document.getElementById('signature-pad'))[0];
            if(newValue.w * 0.8 > 850) {
                scope.canvas.width = newValue.w = 850;
            }else {
                scope.canvas.width = newValue.w * 0.8;
            }
            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    };
});/**
 * Created by Joshua on 4/6/2015.
 */
