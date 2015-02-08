'use strict';

angular.module('guardians').directive('guardianList', ['Guardians', 'Notify', function(Guardians, Notify) {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/guardians/views/view-guardians-child-profile.client.view.html',
		link: function(scope, element, attrs) {
			//when a customer is added, update the customer list

			Notify.getMsg('NewGuardian', function(event, data) {
				scope.$$childHead.guardians = Guardians.query();
			});
		}
	};
}]);

angular.module('guardians').directive('guardianCheckOut', ['Guardians', 'Notify', function(Guardians, Notify) {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/guardians/views/view-guardians-checkout.client.view.html',
		link: function(scope, element, attrs) {
			//when a customer is added, update the customer list

			Notify.getMsg('NewGuardian', function(event, data) {
				scope.$$childHead.guardians = Guardians.query();
			});
		}
	};
}]);