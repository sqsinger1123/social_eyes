
// Some config vars, Namespaced. We can play with these.
var globalConfigs = {};
globalConfigs['num_photos'] = 3;

(function() {
	// From the makers of the StairMaster(tm), we bring you....
	var app = angular.module('socialEyesMaster', [] );
	sqs$ngapp = app;

	app.controller('socialController', ['$scope', function($scope) {
		var obj = this;
		return this;
	}]);

})();
