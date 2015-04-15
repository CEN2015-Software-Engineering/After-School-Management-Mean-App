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


                }).then(function(){
                    $scope.rosterChildren = [];
                    $scope.signedOutChildren = [];
                    $scope.addableChildren = [];
                    for(var i in $scope.allChildren){
                        var pushed = false;
                        var childHasAttToday = false;
                        for(var j in $scope.attendances){
                            if( $scope.allChildren[i]._id === $scope.attendances[j].childID ) {
                                // attendance j is for child i
                                if( $scope.attendances[j].date.year === $scope.year ){
                                    // attendance j is this year
                                    if( $scope.attendances[j].date.month === $scope.month ){
                                        // attendance j is this month
                                        if(   $scope.attendances[j].date.day === $scope.dayNumerical){
                                            // attendance j is today
                                            childHasAttToday = true;
                                            if( $scope.attendances[j].signedOut ){
                                                //this child was already signed out today, add to signed out children
                                                $scope.signedOutChildren.push($scope.allChildren[i]);
                                                pushed = true;
                                            }
                                            else{
                                                //this child has an open attendance for today, add to roster children
                                                $scope.rosterChildren.push($scope.allChildren[i]);
                                                pushed = true;
                                            }
                                        }
                                    }
                                }
                                
                            }
                        }

                        if( !childHasAttToday ) {
                            // this child has no existing attendance
                            if( $scope.allChildren[i].enrolled ) {
                                // this child is currently enrolled in the school
                                $scope.day = moment().format('ddd').toLowerCase();
                                var enrolledToday = false;
                                if ( $scope.day === 'sun' && $scope.allChildren[i].schedule.sun ) {
                                    enrolledToday = true;
                                } else if ( $scope.day === 'mon' && $scope.allChildren[i].schedule.mon ) {
                                    enrolledToday = true;
                                } else if ( $scope.day === 'tue' && $scope.allChildren[i].schedule.tue ) {
                                    enrolledToday = true;
                                } else if ( $scope.day === 'wed' && $scope.allChildren[i].schedule.wed ) {
                                    enrolledToday = true;
                                } else if ( $scope.day === 'thu' && $scope.allChildren[i].schedule.thu ) {
                                    enrolledToday = true;
                                } else if ( $scope.day === 'fri' && $scope.allChildren[i].schedule.fri ) {
                                    enrolledToday = true;
                                } else if ( $scope.day === 'sat' && $scope.allChildren[i].schedule.sat ) {
                                    enrolledToday = true;
                                }
                                if ( enrolledToday ) {
                                    // this child is expected to attend today, add to roster children
                                    $scope.rosterChildren.push($scope.allChildren[i]);
                                    pushed = true;
                                }
                                if( !pushed ){
                                    // shouldn't show up on today's roster, eligible for add student button
                                    $scope.addableChildren.push($scope.allChildren[i]);
                                    //lol
                                }
                            }
                        }
                    }
                });
            });
        };

        this.toggleAdd = function(add){
            add = !add;
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