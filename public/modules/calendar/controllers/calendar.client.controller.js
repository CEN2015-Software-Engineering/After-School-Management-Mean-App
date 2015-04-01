'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', 'Advents', '$modal', '$log', 'instructorPerm'
	function($scope, Advents, $modal, $log, instructorPerm) {
		
        $scope.editGuardians = instructorPerm.getEditGuardians();
        $scope.deleteGuardians = instructorPerm.getDeleteGuardians();

        $scope.$watch(function (){ return instructorPerm.getEditGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.editGuardians = newValue;
        });
        $scope.$watch(function (){ return instructorPerm.getDeleteGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.deleteGuardians = newValue;
        });

        // Controller Logic
		// ...
		$scope.day = moment();

        $scope.find = function() {
            $scope.advents = Advents.query();
        };


        //Open Modal Window to Add Guardian
        this.openModal = function (size, selectedEvent) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/advents/views/view-advent-from-calendar.client.view.html',
                controller: function ($scope, $modalInstance, $stateParams, advent) {
                    $scope.advent = advent;

                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    advent: function() {
                        return selectedEvent;
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