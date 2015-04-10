'use strict';

angular.module('core').factory('instructorPerm', function(){
	//console.log('In the factory that rules all factories');
	
	var data = { editGuardians: false, deleteGuardians: false, addGuardians: false };
	return {
		getEditGuardians: function(){
						//console.log('in the factory Getting edit' + data.editGuardians);

			return data.editGuardians;
		},
		setEditGuardians: function( editGuardian ){
			//console.log('in the factory setting edit');
			data.editGuardians = editGuardian;
		},

		getDeleteGuardians: function(){
						//console.log('in the factory Getting delete ' + data.deleteGuardians);

			return data.deleteGuardians;
		},
		setDeleteGuardians: function( deleteGuardian ){
			//console.log('in the factory setting delete');
			data.deleteGuardians = deleteGuardian;
		},

		getAddGuardians: function(){
						//console.log('in the factory Getting delete ' + data.deleteGuardians);

			return data.addGuardians;
		},
		setAddGuardians: function( addGuardian ){
			//console.log('in the factory setting delete');
			data.addGuardians = addGuardian;
		}
	};
});