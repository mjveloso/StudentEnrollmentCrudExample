(function() {

	angular.module('app', [
		'StudentController',
		'StudentService'
	])
	.directive('mvTest', function() {

	    return {
	        restrict: 'EA',
	        template: '<h4>Hello {{name}}</h4><son></son>',
	        controller: function() {
	        	this.name = "Merlon Veloso";
	        },
	        link: function(scope, elem, attrs, ctrl) {
	        	scope.name = ctrl.name;
	        }
	    };

	})
	.directive('son', function() {

		return {
			restrict: 'EA',
			require: '^mvTest',
			template: '<h4>{{sonSays}}</h4>',
			link: function(scope, elems, attrs, ctrl) {
				scope.sonSays = "My Dad's name is " + ctrl.name;
			}
		}

	});

}) ();