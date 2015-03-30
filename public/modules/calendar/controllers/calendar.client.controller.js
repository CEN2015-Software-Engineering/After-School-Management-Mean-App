'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', 'Advents', '$modal', '$log',
	function($scope, Advents, $modal, $log) {
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
                $scope.find();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

	}
]);