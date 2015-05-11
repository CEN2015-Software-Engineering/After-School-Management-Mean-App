'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Menus', 'instructorPerm', '$http',
	function($scope, Menus,  instructorPerm, $http) {
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.isUnlocked = false;
		$scope.passcode = '1111';
		$scope.editGuardians = instructorPerm.getEditGuardians();
		$scope.deleteGuardians = instructorPerm.getDeleteGuardians();
		$scope.addGuardians = instructorPerm.getAddGuardians();

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
		$scope.$watch('addGuardians', function (newValue, oldValue){
			if(newValue !== oldValue){
				console.log('sidebar controller newvalue add');
			 instructorPerm.setAddGuardians(newValue);

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

            $http.get('/modules/core/controllers/passcode.json').success(function(data) {
                $scope.passcode = data.passcode;
                console.log(data.passcode);
            });
		};

		$scope.doTheBack = function() {
			window.history.back();
		};

		$scope.relock = function(){
			$scope.isUnlocked = false;
			instructorPerm.setEditGuardians(false);
			instructorPerm.setDeleteGuardians(false);
			instructorPerm.setAddGuardians(false);
			$scope.editGuardians = instructorPerm.getEditGuardians();
			$scope.deleteGuardians = instructorPerm.getDeleteGuardians();
			$scope.addGuardians = instructorPerm.getAddGuardians();
		};

		$scope.changePasscode = function(){
			$scope.passcode = document.getElementById('PINchange').value;
            $scope.passcodeJSON = {
                passcode: $scope.passcode
            };
            $http.post('/modules/core/controllers/passcode.json', $scope.passcodeJSON, {headers: {'Content-Type': 'application/json'}} ).success(function(data) {
                $scope.passcode = data.passcode;
                console.log(data.passcode);
            });
			alert('Pin Changed');
		};

        $scope.resetPinToDefault = function(){
            $scope.passcode = document.getElementById('PINchange').value;
            $scope.passcodeJSON = {
                passcode: '0000'
            };
            $http.post('/modules/core/controllers/passcode.json', $scope.passcodeJSON, {headers: {'Content-Type': 'application/json'}} ).success(function(data) {
                $scope.passcode = data.passcode;
                console.log(data.passcode);
            });
            alert('Pin Changed');
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
			} else if (document.getElementById('PINbox').value === $scope.passcode){
				document.getElementById('PINbox').value = ''; 
				$scope.isUnlocked = true;
				instructorPerm.setEditGuardians(true);
				instructorPerm.setAddGuardians(true);
				setTimeout(function() {
					 $scope.$apply(function () {
            
						$scope.isUnlocked = false;
						//alert('timout popped '+ $scope.isUnlocked);
						instructorPerm.setEditGuardians(false);
						instructorPerm.setDeleteGuardians(false);
						instructorPerm.setAddGuardians(false);
						$scope.editGuardians = instructorPerm.getEditGuardians();
						$scope.deleteGuardians = instructorPerm.getDeleteGuardians();
						$scope.addGuardians = instructorPerm.getAddGuardians();
					});
			}, 60000);
					 
			}else{
				alert('Wrong Pin Code: '+ document.getElementById('PINbox').value);
				document.getElementById('PINbox').value = '';
		} };
	}
]);
