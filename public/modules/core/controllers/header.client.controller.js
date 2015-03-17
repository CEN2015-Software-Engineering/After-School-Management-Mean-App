'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Menus', 'Sidebars', 'instructorPerm',
	function($scope, Menus, Sidebars, instructorPerm) {
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.isUnlocked = false;

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

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.getPin = function(){
			//ask josh for help getting from the db
		};

		$scope.doTheBack = function() {
			window.history.back();
		};

		$scope.goHome = function() {
			window.location.href = '/#!/';
		};
		$scope.addNumber = function(numValue){
		 document.getElementById('PINbox').value = document.getElementById('PINbox').value+numValue;
		};
		$scope.clearForm = function(element){
			document.getElementById('PINbox').value = '';
		};

		$scope.submitForm = function(element) {

			if (document.getElementById('PINbox').value === '') { 
				alert('Enter a PIN'); 
			} else if (document.getElementById('PINbox').value === '1111'){
				document.getElementById('PINbox').value = ''; 
				$scope.isUnlocked = true;
				setTimeout(function() {
					 $scope.$apply(function () {
            
						$scope.isUnlocked = false;
						alert('timout popped '+ $scope.isUnlocked);
						instructorPerm.setEditGuardians(false);
						instructorPerm.setDeleteGuardians(false);
						$scope.editGuardians = instructorPerm.getEditGuardians();
						$scope.deleteGuardians = instructorPerm.getDeleteGuardians();
					});
			}, 60000);
					 
			}else{
				alert('Wrong Pin Code: '+ document.getElementById('PINbox').value);
				document.getElementById('PINbox').value = '';
		} };
	}
]);
