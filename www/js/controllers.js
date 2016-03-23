var app = angular.module('app.controllers', [])
  

app.controller('loginCtrl', function($scope, $state, RegisterService,$rootScope) {
	$scope.password="password";
    $scope.things = RegisterService.getAll();
    
    $scope.initializeLogin = function(){
        $scope.login = {};
    };

    $scope.showPass=function(){
        if ($scope.password == "password"){
            $scope.password="text";
        } else {
            $scope.password="password";
        }
    };

	$scope.loginObj=function(isValid){
		if(isValid) {
            var loggedIn = false;
            var loggedUser = [];
            for (var i=0;i<$scope.things.users.length;i++){
                if ($scope.login.email == $scope.things.users[i].email){
                    loggedUser.push($scope.things.users[i])
                }
            }
            if (loggedUser[0]){
                loggedUser = loggedUser[0];
                $rootScope.user = loggedUser;
            } else {
                $scope.noEmail = true;
            }
            if ($scope.login.password == loggedUser.password){
                loggedIn = true;
            } else {
                $scope.SignUpError = true;
            }
            if (loggedIn){
                for (var x=0;x<$scope.things.profile.length;x++){
                    if ($scope.login.email == $scope.things.profile[x].email){
                        var storage = true;
                    }
                }
                if (storage){
                    $state.go('storage');
                } else {
                    $state.go('profileEdit');
                }
            }
		}
	};

    $scope.removeError = function(){
        $scope.SignUpError = false;
        $scope.noEmail = false;
    }
})

app.controller('signupCtrl', function($scope,$state,RegisterService) {

	$scope.createUser = function(isValid) {
    	if(isValid) {
            RegisterService.add($scope.signUp);
            $state.go('login');
        }
    };

  	$scope.initializeSignup = function(){
  		$scope.signUp = {};
  	};
})

app.controller('profileCtrl', function($scope, $location,$rootScope,$state,ProfileService) {

    $scope.things = ProfileService.getAll();

    $scope.initializeUser=function(){
        $scope.user={};
        $scope.user.address=[];
        $scope.user.qualification_details=[];
        $scope.user.experience_details=[];
        $scope.user.references=[];
        $scope.user.address.push({});
        $scope.user.qualification_details.push({});
        $scope.user.experience_details.push({});
        $scope.user.references.push({});
    }

    $scope.$watch(function(){
        return $location.path();
    }, function(value){
        console.log(value);
    });

    $scope.save = function(isValid){
        if (isValid){
            $rootScope.temp = $scope.temp;
            $scope.temp.references.push($scope.reference);
            $scope.temp.references.splice(1,1);
            ProfileService.add($scope.temp);
            $state.go('storage');
        }
    }

    $scope.pages=function(){
        $scope.page1 = true;
        $scope.page2 = false;
        $scope.page3 = false;
        $scope.page4 = false;
        $scope.page5 = false;
    }

    $scope.nextPage = function(isValid){
        if ($scope.page1 == true){
            if (isValid){
                $scope.temp = $scope.user;
                $scope.page1 = false;
                $scope.page2 = true;
                $scope.value = "20";
            }
        } else
        if ($scope.page2 == true){
            if (isValid){
                $scope.temp.address.push($scope.address);
                $scope.temp.address.splice(1,1);
                $scope.page2 = false;
                $scope.page3 = true;
                $scope.value = "40";
            }
        } else
        if ($scope.page3 == true){
            if (isValid){
                $scope.temp.qualification_details.push($scope.qualification);
                $scope.temp.qualification_details.splice(1,1);
                $scope.page3 = false;
                $scope.page4 = true;
                $scope.value = "60";
            }
        } else
        if ($scope.page4 == true){
            if (isValid){
                $scope.temp.experience_details.push($scope.experience);
                $scope.temp.experience_details.splice(1,1);
                $rootScope.temp = $scope.temp;
                $scope.page4 = false;
                $scope.page5 = true;
                $scope.value = "80";
            }
        }
    };

    $scope.prevPage = function(isValid){
        if (isValid){
            if ($scope.page2 == true){
                $scope.page1 = true;
                $scope.page2 = false;
            } else
            if ($scope.page3 == true){
                $scope.page2 = true;
                $scope.page3 = false;
            } else
            if ($scope.page4 == true){
                $scope.page3 = true;
                $scope.page4 = false;
            } else
            if ($scope.page5 == true){
                $scope.page4 = true;
                $scope.page5 = false;
            }
        }
    };

    $scope.findOne = function(){
        var loggedInUser = [];
        console.log($scope.things);
        for (var i=0;i<$scope.things.users.length;i++){
            if ($rootScope.user.email == $scope.things.users[i].email){
                loggedInUser.push($scope.things.users[i]);
            }
        }
        loggedInUser = loggedInUser[0];
        $scope.user.email = loggedInUser.email
    }

    $scope.removeAddress = function (address) {
        var index = $scope.user.address.indexOf(address);
        $scope.user.address.splice(index, 1);
    };

    $scope.addAddress = function () {
        $scope.user.address.push({});
    };

    $scope.addQualification = function () {
        $scope.user.qualification_details.push({});
    };
    
    $scope.removeQualification = function (qualification) {
        var index = $scope.user.qualification_details.indexOf(qualification);
        $scope.user.qualification_details.splice(index, 1);
    };

     $scope.addExperience = function () {
        $scope.user.experience_details.push({});
    };
    
    $scope.removeExperience = function (experience) {
        var index = $scope.user.experience_details.indexOf(experience);
        $scope.user.experience_details.splice(index, 1);
    };

    $scope.addReference = function () {
        $scope.user.references.push({});
    };

    $scope.removeReference = function (reference) {
        var index = $scope.user.references.indexOf(reference);
        $scope.user.references.splice(index, 1);
    };

    $scope.dates=[];
    var initDates = function () {
        var i;
        var d = new Date();
        var n = d.getFullYear();
        for (i = 1900; i <= n; i++) {
            $scope.dates.push(i);
        }
    };
    initDates();
})

app.controller('storageCtrl', function($scope, $location,RegisterService,$state) {
    $scope.things = RegisterService.getAll();
    $scope.delete = function(thing){
        RegisterService.remove(thing);
    }

    $scope.logOut=function(){
        $state.go('login');
    }
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });
            if ($scope.map.rmiUrl){
                CurrentLat = $scope.map.rmiUrl.slice(29,39);
                console.log(CurrentLat);
                CurrentLon = $scope.map.rmiUrl.slice(40,50);
                console.log(CurrentLon);
            }
            var infoWindow = new google.maps.InfoWindow({
                content: "Here I am!"
            }); 
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });
        });
    }, function(error){
        console.log("Could not get location");
    });
})

.controller('HomeCtrl', function($scope, $state, $cordovaGeolocation) {

});