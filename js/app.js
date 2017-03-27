
// Some config vars, Namespaced. We can play with these. Maybe useful later.
var globalConfigs = {};
globalConfigs['num_photos'] = 3;

(function() {
	// From the makers of the StairMaster(tm), we bring you....
	var app = angular.module('socialEyesMaster', [] );

	app.service('facebookAPI', function() {
		var obj = this;

		return this;
	});

	app.controller('socialController', ['$scope', 'facebookAPI', function($scope, facebookAPI) {
		var obj = this;

		// Keep track of various aspects of the UI state.
		$scope.state = {
			fb: {
				checked_login: false,
				logged_in: false
			}
		};
		$scope.fb_data = {
			email: '',
			id: '',
			name: '',
			photos: [], // To be populated below.
		}

		window.checkLoginState = function() {
			FB.getLoginStatus(function(response) {
				$scope.state.fb.checked_login = true;

				if(response.status === 'connected') {
					$scope.state.fb.logged_in = true;
					$scope.fetchData();
				} else {
					$scope.state.fb.logged_in = false;
					$scope.promptLogin();
				}
			})
		}
		$scope.checkLoginState = window.checkLoginState;

		$scope.fetchData = function() {
			FB.api('/me?fields=id,name,email,photos{created_time,name,id,images}', function(response) {
				$scope.$apply(function() {
					$scope.fb_data.photos = response.photos.data;
					console.log($scope.fb_data.photos);
					$scope.numtest.push(1);
				})
			});
		}

		$scope.promptLogin = function() {
			return false; // TODO
		}

		$scope.initializeFB = function() {
			window.fbAsyncInit = function() {
			    FB.init({
			      appId      : '237647576701686',
			      cookie     : true,  // enable cookies to allow the server to access 
			                          // the session
			      xfbml      : true,  // parse social plugins on this page
			      version    : 'v2.8' // use graph api version 2.8
			    });

			    $scope.checkLoginState();
			  };

			  // Load the SDK asynchronously
			  (function(d, s, id) {
			    var js, fjs = d.getElementsByTagName(s)[0];
			    if (d.getElementById(id)) return;
			    js = d.createElement(s); js.id = id;
			    js.src = "//connect.facebook.net/en_US/sdk.js";
			    fjs.parentNode.insertBefore(js, fjs);
			  }(document, 'script', 'facebook-jssdk'));
		}

		$scope.initializeFB();

		$scope.numtest = [1,2,3,4,5];

		return this;
	}]);

})();
