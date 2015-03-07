'use strict';

angular.module('guardians').directive('guardianList', ['Guardians', 'Notify', function(Guardians, Notify) {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/guardians/views/view-guardians-child-profile.client.view.html',
		link: function(scope, element, attrs) {
			//when a guardian is added, update the guardian list

			Notify.getMsg('NewGuardian', function(event, data) {
				scope.$$childHead.guardians = Guardians.query();
                scope.$$childTail.guardians = scope.$$childHead.guardians;
                console.log(scope);
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
			//when a guardian is added, update the guardian list

			Notify.getMsg('NewGuardian', function(event, data) {
				scope.$$childHead.guardians = Guardians.query();
                scope.$$childTail.guardians = scope.$$childHead.guardians;
			});
		}
	};
}]);