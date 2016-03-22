var app = angular.module('app.controllers', [])
  

app.controller('loginCtrl', function($scope, $state, StorageService,$rootScope) {
	$scope.password="password";
	
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
    $scope.things = StorageService.getAll();

	$scope.loginObj=function(loginForm){
		if(loginForm.$valid) {
            var loggedIn = false;
            if (loggedIn == false){
                for (var i=0;i<$scope.things.length;i++){
                    if ($scope.things[i].email){
                        if ($scope.login.email == $scope.things[i].email){
                            if ($scope.login.password == $scope.things[i].password){
                                loggedIn = true;
                            } else {
                                $scope.SignUpError = true;
                            }
                        } else {
                            $scope.noEmail = true;
                        }
                    }
                }
            }
            if (loggedIn){
                for (var x=0;x<$scope.things.length;x++){
                    if ($scope.things[x].emailId){
                        if (($scope.login.email == $scope.things[x].emailId) && $scope.things[x].dob){
                            $state.go('storage');
                        }
                    } else {
                        $state.go('profileView');
                    }
                }
            }
		}
	};

    $scope.removeError = function(){
        $scope.SignUpError = false;
        $scope.noEmail = false;
    }
})

app.controller('signupCtrl', function($scope,$state,StorageService) {
    $scope.things = StorageService.getAll();
    $scope.remove = function (thing) {
        StorageService.remove(thing);
    };

	$scope.createUser = function(signUpForm) {
    	if(signUpForm.$valid) {
            StorageService.add($scope.signUp);
            $state.go('login');
        }
    };

  	$scope.initializeSignup = function(){
  		$scope.signUp = {};
  	};
})

app.controller('userCtrl', function($scope) {
	$scope.user = function(){
	};
})

app.controller('profileCtrl', function($scope, $location,StorageService,$rootScope,$state) {

    $scope.things = StorageService.getAll();

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

    $scope.save=function(profileForm5){
        if (profileForm5){
            $rootScope.temp = $scope.temp;
            $scope.temp.references.push($scope.reference);
            $scope.temp.references.splice(1,1);
            StorageService.add($scope.temp);
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

    $scope.nextPage = function(profileForm1,profileForm2,profileForm3,profileForm4){
        if ($scope.page1 == true){
            if (profileForm1){
                $scope.page1 = false;
                $scope.page2 = true;
                $scope.value = "20";
                var temp = $scope.user;
                $scope.temp = temp;
            }
        } else
        if ($scope.page2 == true){
            if (profileForm2){
                $scope.temp.address.push($scope.address);
                $scope.temp.address.splice(1,1);
                $scope.page2 = false;
                $scope.page3 = true;
                $scope.value = "40";
            }
        } else
        if ($scope.page3 == true){
            if (profileForm3){
                $scope.temp.qualification_details.push($scope.qualification);
                $scope.temp.qualification_details.splice(1,1);
                $scope.page3 = false;
                $scope.page4 = true;
                $scope.value = "60";
            }
        } else
        if ($scope.page4 == true){
            if (profileForm4){
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
        // if (isValid){
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
        // }
    };

    $scope.findOne = function(){

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

app.controller('storageCtrl', function($scope, $location,StorageService,$state) {
    $scope.things = StorageService.getAll();
    console.log($scope.things);

    $scope.delete = function(thing){
        StorageService.remove(thing);
    }

    $scope.logOut=function(){
        $state.go('login');
    }
});