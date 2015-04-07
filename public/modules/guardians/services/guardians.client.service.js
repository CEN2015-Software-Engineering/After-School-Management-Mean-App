'use strict';

//Guardians service used to communicate Guardians REST endpoints
angular.module('guardians')
    .factory('Guardians', ['$resource', function($resource) {
        return $resource('guardians/:guardianId', { guardianId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
    ])
    .factory('Notify', ['$rootScope', function($rootScope) {
        //When we save a new customer from the model, it will send information to the main view to update the scope
        var notify = {};

        notify.sendMsg = function(msg, data) {
            data = data || {};
            $rootScope.$emit(msg, data);
        };

        notify.getMsg = function(msg, func, scope){
            var unbind = $rootScope.$on(msg, func);
            if( scope ) {
                scope.$on('destroy', unbind);
            }
        };

        return notify;
    }

    ]);