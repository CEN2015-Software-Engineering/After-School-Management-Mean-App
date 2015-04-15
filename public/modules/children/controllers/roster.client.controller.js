'use strict';



// Children controller
angular.module('children').controller('TodaysRosterController', ['$scope', '$window', '$stateParams', '$location', 'Children', 'Attendances', 'instructorPerm', '$http',
    function($scope, $window, $stateParams, $location, Children, Attendances, instructorPerm, $http) {

        $scope.editGuardians = instructorPerm.getEditGuardians();
        $scope.deleteGuardians = instructorPerm.getDeleteGuardians();

        $scope.$watch(function (){ return instructorPerm.getEditGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.editGuardians = newValue;
        });
        $scope.$watch(function (){ return instructorPerm.getDeleteGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.deleteGuardians = newValue;
        });
        $scope.addGuardians = instructorPerm.getAddGuardians();
        $scope.$watch(function (){ return instructorPerm.getAddGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.addGuardians = newValue;
        });

        $scope.initRoster = function() {

            $scope.day = moment().format('ddd').toLowerCase();
            console.log($scope.day);
            $scope.dayNumerical = moment().date();
            console.log($scope.dayNumerical);
            $scope.month = moment().month() + 1; //moment is 0 indexed, adding one corrects to jan = 1 ... dec = 12
            console.log($scope.month);
            $scope.year = moment().year();
            console.log($scope.year);

            $http.get('/attendances').success(function(data){
                $scope.attendances = data;

                $http.get('/children/').success(function(data){
                    $scope.allChildren = data;
                    console.log("All");
                    console.log($scope.allChildren);

                }).then(function(){
                    $scope.rosterChildren = [];
                    $scope.signedOutChildren = [];

                    for(var i in $scope.allChildren){
                        var childHasAttToday = false;
                        for(var j in $scope.attendances){
                            if( $scope.allChildren[i]._id === $scope.attendances[j].childID ) {

                                if( $scope.attendances[j].date.day === $scope.dayNumerical ){

                                    if( $scope.attendances[j].date.month === $scope.month ){

                                        if(  $scope.attendances[j].date.year === $scope.year ){

                                            childHasAttToday = true;
                                            if( $scope.attendances[j].signedOut ){
                                                $scope.signedOutChildren.push($scope.allChildren[i]);
                                            }
                                            else{
                                                $scope.rosterChildren.push($scope.allChildren[i]);
                                            }
                                        }
                                    }
                                }
                                
                            }
                        }

                        if(!childHasAttToday) {
                            $scope.day = moment().format('ddd').toLowerCase();
                            var enrolled = false;
                            if ($scope.day === 'sun' && $scope.allChildren[i].schedule.sun) {
                                enrolled = true;
                            } else if ($scope.day === 'mon' && $scope.allChildren[i].schedule.mon) {
                                enrolled = true;
                            } else if ($scope.day === 'tue' && $scope.allChildren[i].schedule.tue) {
                                enrolled = true;
                            } else if ($scope.day === 'wed' && $scope.allChildren[i].schedule.wed) {
                                enrolled = true;
                            } else if ($scope.day === 'thu' && $scope.allChildren[i].schedule.thu) {
                                enrolled = true;
                            } else if ($scope.day === 'fri' && $scope.allChildren[i].schedule.fri) {
                                enrolled = true;
                            } else if ($scope.day === 'sat' && $scope.allChildren[i].schedule.sat) {
                                enrolled = true;
                            }
                            if (enrolled) {
                                console.log($scope.allChildren[i].firstName + " is enrolled with no attendance");
                                $scope.rosterChildren.push($scope.allChildren[i]);
                            }
                        }
                    }
                    console.log("Roster");
                    console.log($scope.rosterChildren);
                    console.log("Signed Out");
                    console.log($scope.signedOutChildren);
                });
            })
        };

        this.theDate = function() {
            return moment().format('dddd, MMMM Do YYYY');
        };

        this.enrolledToday = function(child){
            // create attendance if it doesn't exist

            if($scope.day === 'sun' && child.schedule.sun){
                return true;
            }else if($scope.day === 'mon' && child.schedule.mon) {
                return true;
            }else if($scope.day === 'tue' && child.schedule.tue){
                return true;
            }else if($scope.day === 'wed' && child.schedule.wed){
                return true;
            }else if($scope.day === 'thu' && child.schedule.thu){
                return true;
            }else if($scope.day === 'fri' && child.schedule.fri){
                return true;
            }else if($scope.day === 'sat' && child.schedule.sat){
                return true;
            }else {
                return false;
            }
        };

    }
]);