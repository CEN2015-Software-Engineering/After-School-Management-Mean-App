'use strict';

angular.module('core').factory('instructorPerm', function(){
	console.log('In the factory that rules all factories');
	
	var data = { editGuardians: false, deleteGuardians: false };
	return {
		getEditGuardians: function(){
						console.log('in the factory Getting edit' + data.editGuardians);

			return data.editGuardians;
		},
		setEditGuardians: function( editGuardian ){
			console.log('in the factory setting edit');
			data.editGuardians = editGuardian;
		},

		getDeleteGuardians: function(){
						console.log('in the factory Getting delete ' + data.deleteGuardians);

			return data.deleteGuardians;
		},
		setDeleteGuardians: function( deleteGuardian ){
			console.log('in the factory setting delete');
			data.deleteGuardians = deleteGuardian;
		}
	};
});