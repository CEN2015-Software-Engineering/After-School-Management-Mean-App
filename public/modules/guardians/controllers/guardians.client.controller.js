'use strict';

// Guardians controller
angular.module('guardians').controller('GuardiansController', ['$scope', '$window', '$stateParams', '$location', 'Guardians', '$modal', '$log', 'instructorPerm',
	function($scope, $window, $stateParams, $location, Guardians, $modal, $log, instructorPerm) {

		$scope.editGuardians = instructorPerm.getEditGuardians();
		$scope.deleteGuardians = instructorPerm.getDeleteGuardians();

		$scope.$watch(function (){ return instructorPerm.getEditGuardians(); }, function(newValue, oldValue){
			if(newValue !== oldValue) $scope.editGuardians = newValue;
		});
		$scope.$watch(function (){ return instructorPerm.getDeleteGuardians(); }, function(newValue, oldValue){
			if(newValue !== oldValue) $scope.deleteGuardians = newValue;
		});

		// Remove existing Guardian
		this.remove = function(guardian) {
			// if($window.confirm('Are you sure you want to delete ' + guardian.gName + ' ?')) {
				if ( guardian ) {
					guardian.$remove();

					for (var i in $scope.guardians) {
						if ($scope.guardians [i] === guardian) {
							$scope.guardians.splice(i, 1);
						}
					}
				} else {
					$scope.guardian.$remove(function() {
						$location.path('guardians');
					});
				}
			// }
		};

		// Find a list of Guardians
		$scope.find = function() {
			$scope.guardians = Guardians.query();
		};

		// Find existing Guardian
		$scope.findOne = function() {
			$scope.guardian = Guardians.get({
				guardianId: $stateParams.guardianId
			});
		};

		//find Guardians by ChildID
		$scope.findByChildID = function(id) {
			console.log($scope);
			$scope.guardians = Guardians.query();
			console.log(id);
		};

		//checks to see if a child for a given id has a guardian
		this.hasGuardian = function(id, guardians){
			var i = 0;
			for(i;i<guardians.length;i++)
				{
					if(guardians.childID === id){
						return true;
					}
				}
				return false;
		};

	//The following is control for the child-sign-out page
		//for when you select a guardian they are stored here
		var selected;
		//this is to control adding more children button
		var moreChillun;
		//controls showing more children
		var moreChillunList = false;
		//sets selected
		this.setselected = function(guardian){
			selected = guardian;
			moreChillun = true;
		};
		this.getSelected = function(){
			return selected;
		};
		this.gimmeMyChillun = function(){
			return moreChillun;
		};
		this.setMyChillun = function(variable){
			moreChillun = variable;
		};
		this.setMoChilList = function(variable){
			moreChillunList = variable;
		};
		this.gimmeMoChilList = function(){
			return moreChillunList;
		};


		//Open Modal Window to Add Guardian
		this.modalCreate = function (size, selectedChild) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/guardians/views/create-guardian-child-profile.client.view.html',
				controller: function ($scope, $modalInstance, $stateParams, child) {
					$scope.child = child;

					$scope.ok = function () {
						$modalInstance.close();
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				size: size,
				resolve: {
					child: function() {
						return selectedChild;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};


		//Open Modal Window to Update Guardian
		this.modalUpdate = function (size, selectedGuardian) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/guardians/views/edit-guardian.client.view.html',
				controller: function ($scope, $modalInstance, $stateParams, guardian) {
					$scope.guardian = guardian;


					$scope.ok = function () {
						$modalInstance.close($scope.guardian);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				size: size,
				resolve: {
					guardian: function() {
						return selectedGuardian;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	}
]);

angular.module('guardians').controller('GuardiansCreateController', ['$scope', 'Guardians', 'Notify',
	function($scope, Guardians, Notify) {
		// Create new Guardian
		this.create = function(childId) {
			// Create new Guardian object
			var guardian = new Guardians ({
				gName: this.gName,
				childID: childId,
				rel: this.rel
			});

			// Redirect after save
			guardian.$save(function(response) {
				//After the Guardian has been saved, send a message to the view there is a customer to show
				Notify.sendMsg('NewGuardian', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.relationships = ['Mom', 'Dad', 'Sister', 'Brother', 'Aunt', 'Uncle', 'Grandmother', 'Grandfather', 'Other'];

	}
]);

angular.module('guardians').controller('GuardiansUpdateController', ['$scope', '$stateParams', '$location', 'Guardians',
	function($scope, $stateParams, $location, Guardians) {
		// Update existing Guardian
		this.update = function(updatedGuardian) {
			var guardian = updatedGuardian;

			guardian.$update(function() {
				//this updates the guardian

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.relationships = ['Mom', 'Dad', 'Sister', 'Brother', 'Aunt', 'Uncle', 'Grandmother', 'Grandfather', 'Other'];

		$scope.guardians = Guardians.query();

	}
]);

