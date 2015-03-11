'use strict';

// Advents controller
angular.module('advents').controller('AdventsController', ['$scope', '$stateParams', '$location', 'Advents', '$timeout',
	function($scope, $stateParams, $location, Advents, $timeout) {


        //MODAL TO OPEN ADVENT - USE GUARDIAN AS A TEMPLATE


		// Create new Advent
		$scope.create = function() {
			// Create new Advent object
            while(this.description !== this.description.replace('\n', '<br />')){
                this.description = this.description.replace('\n', '<br />');
            }
			var advent = new Advents ({
				name: this.name,
				date:{
					day: this.day,
					month: this.month,
					year: this.year
				},
                time: {
                    hr: this.hr,
                    min: this.min,
                    timeSuffix: this.timeSuffix
                },
				description: this.description.replace('\n', '<br />')
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

            while(advent.editableDescription !== advent.editableDescription.replace('\n', '<br />')){
                advent.editableDescription = advent.editableDescription.replace('\n', '<br />');
                console.log(advent.editableDescription);
            }
            advent.description = advent.editableDescription;

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
            $timeout(function(){
                $scope.advent.editableDescription = $scope.advent.description.replace('<br />','\n');

                while($scope.advent.editableDescription !== $scope.advent.editableDescription.replace('<br />','\n')){
                    $scope.advent.editableDescription =  $scope.advent.editableDescription.replace('<br />', '\n');
                    console.log( $scope.advent.editableDescription);
                }
            }, 1500);

        };
	}
]);

// Advents controller
angular.module('advents').controller('AdventsAttendModalController', ['$scope', '$http', '$stateParams', '$location', 'Advents', 'Children', 'Attendances',
    //CREATE ATTENDANCE ENTRY WHEN THIS FUNCTION IS CALLED
    //PASS IN - EVENT ID, CHILD ID
    function($scope, $http, $stateParams, $location, Advents, Children, Attendances) {

        this.processEvent = function (child, advent) {
            console.log(advent);
            var attendance;
            if(child.attending){
                //child is not attending event now, delete attendance
                console.log('deleteing attendance');
                if(child.attendance) {
                    attendance = child.attendance;
                    if ( attendance ) {
                        $http.delete('/attendances/' + attendance._id).
                            success(function (data) {
                                console.log(data);
                            });
                    }else{
                        console.log('doesn\'t exist');
                    }
                }

            }else{
                //child is attending now, create attendance
                console.log('creating attendance');

                attendance = new Attendances({
                    childID: child._id,
                    childName: child.firstName + ' ' + child.lastName,
                    date: {
                        day: advent.date.day,
                        month: advent.date.month,
                        year: advent.date.year
                    },
                    isAdvent: true,
                    adventID: advent._id
                });
                attendance.$save();
                console.log(attendance);
                child.attendence = attendance;
            }
        };


        $scope.init = function (adventID) {
            //Get the Advent
            /*$scope.advent = Advents.get({
             adventId: $stateParams.adventIdForAttendance
             });*/

            console.log($scope);
            //Get the Calendar information
            $http.get('/calendar/' + adventID).
                success(function (data) {
                    console.log(data);
                    $scope.attendancesForAdvent = data;

                    $http.get('/children/').
                        success(function (data) {
                            console.log(data);
                            $scope.children = data;
                        }).then(function () {
                            console.log('complete');
                            for (var i in $scope.children) {
                                for (var j in $scope.attendancesForAdvent) {
                                    if ($scope.children[i]._id === $scope.attendancesForAdvent[j].childID) {
                                        console.log($scope.children[i].firstName + ' ' + $scope.children[i].lastName + ' is attending this event already');
                                        $scope.children[i].attending = true;
                                        $scope.children[i].attendance = $scope.attendancesForAdvent[j];
                                    }
                                }
                            }

                        });
                });
        };

        $scope.advents = Advents.query();
        $scope.attendances = Attendances.query();
    }


]);
