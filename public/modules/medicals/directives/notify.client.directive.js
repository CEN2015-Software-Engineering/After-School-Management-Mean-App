'use strict';

angular.module('medicals').directive('medicalList', ['Medicals', 'Notify', function(Medicals, Notify) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/medicals/views/view-medicals-child-profile.client.view.html',
        link: function(scope, element, attrs) {
            //when a customer is added, update the customer list

            Notify.getMsg('NewGuardian', function(event, data) {
                scope.$$childHead.medicals = Medicals.query();
            });
        }
    };
}]);

angular.module('medicals').directive('medicalCheckOut', ['Medicals', 'Notify', function(Medicals, Notify) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/medicals/views/view-guardians-checkout.client.view.html',
        link: function(scope, element, attrs) {
            //when a customer is added, update the customer list

            Notify.getMsg('newMedical', function(event, data) {
                scope.$$childHead.medicals = Medicals.query();
            });
        }
    };
}]);