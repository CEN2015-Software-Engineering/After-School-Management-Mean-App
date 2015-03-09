'use strict';

angular.module('medicals').directive('medicalList', ['Medicals', 'Notify', '$rootScope', '$window', function(Medicals, Notify, $rootScope, $window) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/medicals/views/view-medicals-child-profile.client.view.html',
        link: function(scope, element, attrs, ctrl, transclude) {
            //when a customer is added, update the customer list
            Notify.getMsg('NewMedical', function(event, data) {
                $window.location.reload();
                angular.element('#personalInfoTab').trigger('click');
                //$("#personalInfoTab").trigger("click");

                /*
                var previousContent = null;

                var triggerRelink = function() {
                    if (previousContent) {
                        previousContent.remove();
                        previousContent = null;
                    }

                    transclude(function (clone) {
                        element.parent().append(clone);
                        previousContent = clone;
                    });

                };

                scope.$$childHead.medicals = Medicals.query();
                scope.this.medicals = scope.$$childHead.medicals;
                scope.$parent.medicals = scope.$$childHead.medicals;
                scope.medicals = scope.$parent.medicals;
                console.log(scope);
                scope.$eval();
                triggerRelink();
                $rootScope.$on(attrs.relinkEvent, triggerRelink);*/
            });




        }
    };
}]);



