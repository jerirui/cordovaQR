var myApp = angular.module('myApp', ['ngCordova', 'ionic', 'qrcodescanner.ctrl']);

angular.module('qrcodescanner.ctrl', [])

  .controller('qrcodeScannerCtrl', function ($scope, $cordovaBarcodeScanner, $cordovaInAppBrowser) {
  	$scope.openButtonState = true;
    $scope.scan = function () {
    	$scope.openButtonState = false;
      	$cordovaBarcodeScanner
        	.scan()
        	.then(function (result) {
        		$scope.openbuttonState = false;
				$scope.scanResult = result;
        	}, function (err) {
				$scope.scanResult = 'SCAN ERROR (see console)';
				console.error(err);
        });
    };

    $scope.openQRLink = function () {
		document.addEventListener('deviceready', function () {

        	var options = {
          		location: "no"
    		};

			$cordovaInAppBrowser.open($scope.scanResult.text, '_blank', options).then(function () {
				console.log("InAppBrowser opened http://ngcordova.com successfully");
			}, function (error) {
				alert("Error Occured");
				console.log("Error: " + error);
			});

			}, false);
		}
  });


myApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
		url: "/tab",
		abstract: true,
		templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
		url: "/home",
		views: {
			'home-tab': {
				templateUrl: "templates/home.html"
			}
		}
    }).state('tabs.scanner', {
    	url: "/scanner",
    	views: {
    		'scanner-tab': {
    			templateUrl: "templates/scanner.html",
    			controller: "qrcodeScannerCtrl"
    		}
    	}
    }).state('tabs.about', {
    	url: "/about",
    	views: {
    		'about-tab': {
    			templateUrl: "templates/about.html"

    		}
    	}
    });



	$urlRouterProvider.otherwise("/tab/home");

});



