'use strict';

angular.module('sidebars').factory('instructorPerm', function(){
	console.log('meow meow meow emow emwoem wow mewoe mowmoemwoe mwo wo');
	
	var data = { editGuardians: false };
	return {
		getEditGuardians: function(){
						console.log('in the factory Getting ' + data.editGuardians);

			return data.editGuardians;
		},
		setEditGuardians: function( editGuardian ){
			console.log('in the factory setting');
			data.editGuardians = editGuardian;
		}
	};
});