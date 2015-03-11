'use strict';

// Sidebars controller
angular.module('sidebars').controller('SidebarsController', ['$scope', '$stateParams',
 '$location', 'Authentication', 'Sidebars', 'instructorPerm',
	function($scope, $stateParams, $location, Authentication, Sidebars, instructorPerm) {
		
		
		$scope.editGuardians = instructorPerm.getEditGuardians();
		$scope.deleteGuardians = instructorPerm.getDeleteGuardians();

		$scope.$watch('editGuardians', function (newValue, oldValue){
			if(newValue !== oldValue){
				console.log('sidebar controller newvalue edit');
			 instructorPerm.setEditGuardians(newValue);

			}
		});
		$scope.$watch('deleteGuardians', function (newValue, oldValue){
			if(newValue !== oldValue){
				console.log('sidebar controller newvalue delete');
			 instructorPerm.setDeleteGuardians(newValue);

			}
		});

	}
]);