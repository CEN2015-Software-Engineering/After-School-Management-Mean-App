'use strict';


// Children controller
angular.module('children').controller('TodaysRosterController', ['$scope', '$window', '$stateParams', '$location', 'Children', 'Attendances', 'instructorPerm',
    function($scope, $window, $stateParams, $location, Children, Attendances, instructorPerm) {

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

        // Find a list of Children
        $scope.find = function() {
            $scope.children = Children.query();
            console.log($scope.children);
            $scope.attendances = Attendances.query();
            console.log($scope.attendances);
            $scope.day = moment().format('ddd').toLowerCase();
            console.log($scope.day);
        };
        this.theDate = function() {
            return moment().format('dddd, MMMM Do YYYY');
        };

        this.enrolledToday = function(child){
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

        this.addedToday = function( attendance ){
            console.log(attendance.childID);
            if( (attendance.date.day === $scope.day) && (attendance.date.month === $scope.month+1) && (attendance.date.year === $scope.year) ){
                return true;
            }
            else{
                return false;
            }
        };

        this.childAddedToday = function( attendance ){
            console.log(attendance.childID);
            if( (attendance.date.day === $scope.day) && (attendance.date.month === $scope.month+1) && (attendance.date.year === $scope.year) ){
                return true;
            }
            else{
                return false;
            }
        };

        console.log($scope.children);

        //Is the kid in checkout yet? Function here
    }
]);