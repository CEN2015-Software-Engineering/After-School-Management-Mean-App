'use strict';

// Sidebars controller
angular.module('sidebars').controller('SidebarsController', ['$scope', '$stateParams',
 '$location', 'Authentication', 'Sidebars', 'instructorPerm',
	function($scope, $stateParams, $location, Authentication, Sidebars, instructorPerm) {
		this.test = 'hmph';
		
		$scope.editGuardians = instructorPerm.getEditGuardians();
		$scope.$watch('editGuardians', function (newValue, oldValue){
			if(newValue !== oldValue){
				console.log('sidebar controller newvalue');
			 instructorPerm.setEditGuardians(newValue);

			}
		});
	}
]);