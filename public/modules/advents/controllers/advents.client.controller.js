'use strict';

// Advents controller
angular.module('advents').controller('AdventsController', ['$scope', '$stateParams', '$location', 'Advents',
	function($scope, $stateParams, $location, Advents) {


        //MODAL TO OPEN ADVENT - USE GUARDIAN AS A TEMPLATE


		// Create new Advent
		$scope.create = function() {
			// Create new Advent object
			var advent = new Advents ({
				name: this.name,
				date:{
					day: this.day,
					month: this.month,
					year: this.year
				},
				description: this.description
			});

			// Redirect after save
			advent.$save(function(response) {
				$location.path('advents/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Advent
		$scope.remove = function(advent) {
			if ( advent ) { 
				advent.$remove();

				for (var i in $scope.advents) {
					if ($scope.advents [i] === advent) {
						$scope.advents.splice(i, 1);
					}
				}
			} else {
				$scope.advent.$remove(function() {
					$location.path('advents');
				});
			}
		};

		// Update existing Advent
		$scope.update = function() {
			var advent = $scope.advent;

			advent.$update(function() {
				$location.path('advents/' + advent._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Advents
		$scope.find = function() {
			$scope.advents = Advents.query();
		};

		// Find existing Advent
		$scope.findOne = function() {
			$scope.advent = Advents.get({ 
				adventId: $stateParams.adventId
			});
		};
	}
]);

// Advents controller
angular.module('advents').controller('AdventsAttendModalController', ['$scope', '$stateParams', '$location', 'Advents', 'Children', 'Attendances',


    //CREATE ATTENDANCE ENTRY WHEN THIS FUNCTION IS CALLED
    //PASS IN - EVENT ID, CHILD ID
    function($scope, $stateParams, $location, Advents, Children, Attendances) {

    	this.createAttendances = function(child, advent)
    	{
    		var i = 0;
    		var attendanceses;
    		while(i<child.length)
    		{
    			var attendance = new Attendances ({
					childID: child[i].childID,
	                childName: child[i].childName,
	                date:{
	                    day: advent.day,
	                    month: advent.month,
	                    year: advent.year
	                },
	                adventB: true,
	                adventID: advent.adventID
				});
				//attendanceses[i] = attendance;
				attendance.$save();
				++i;
    		}
    	};




        $scope.guardians = Advents.query();
        $scope.children = Children.query();
        $scope.attendances = Attendances.query();
    }


]);
