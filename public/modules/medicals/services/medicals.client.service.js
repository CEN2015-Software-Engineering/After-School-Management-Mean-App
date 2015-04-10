'use strict';

//Medicals service used to communicate Medicals REST endpoints
angular.module('medicals').factory('Medicals', ['$resource',
	function($resource) {
		return $resource('medicals/:medicalId', { medicalId: '@_id'
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
