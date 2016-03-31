var app = angular.module('app.controllers', [])

app.controller('loginCtrl', function($scope, $state, RegisterService,$rootScope,ionicMaterialInk,$timeout,AuthenticationService) {
	$scope.password="password";
    $scope.things = RegisterService.getAll();
    console.log($scope.things);
    /* Hide Header in login page */
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
    /* ************************** */
    ionicMaterialInk.displayEffect();
    
    $scope.initializeLogin = function(){
        $scope.login = {};
    };
    
    $scope.initializePass=function(){
        $scope.pass={};
        $scope.respassForm=false;
        $scope.passEmailButton=true;
    };

    $scope.showPass=function(){
        if ($scope.password == "password"){
            $scope.password="text";
        } else {
            $scope.password="password";
        }
    };
    
    $scope.passWord=function(isValid){
        if (isValid){
            AuthenticationService.resetPass($scope.pass.email, function(response) {
                if(response.success) {
                    $scope.respassForm=true;
                    $scope.passEmailButton=false;
                    $scope.passPasswordButton=true;
                    $rootScope.resetpassUser = response.Obj;
                }
            })
        }
    };
    
    $scope.rpass=function(isValid){
        if (isValid){
            if ($rootScope.resetpassUser){
                RegisterService.update($scope.pass)
                $state.go('app.login');
            }
        }
    }

    $scope.loginHere = function (isValid) {
        var loggedIn = false;
        var loggedUser = [];
        if (isValid){
            AuthenticationService.Login($scope.login.email, $scope.login.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.login.email, $scope.login.password);
                    if (response.Obj){
                        $rootScope.user = response.Obj;
                    }
                    if (response){
                        if ($scope.things.profile){
                            for (var x=0;x<$scope.things.profile.length;x++){
                                if (response.Obj.email == $scope.things.profile[x].email){
                                    var storage = true;
                                }
                            }
                        }
                        if (storage){
                            $state.go('app.profileMenu');
                        } else {
                            $state.go('app.profileEdit');
                        }
                    }
                } else {
                    $scope.error = response.message;
                }
            });
        }
    };

})

app.controller('signupCtrl', function($scope,$state,RegisterService,$timeout,ionicMaterialInk) {
    $scope.things = RegisterService.getAll();
    console.log($scope.things); 
    /* Hide Header in login page */
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();
    /* ************************** */
	$scope.createUser = function(isValid) {
    	if(isValid) {
            var signin = false;
            if ($scope.things.users.length != "0"){
                for (var i=0;i<$scope.things.users.length;i++){
                    if ($scope.signUp.email != $scope.things.users[i].email){
                        signin = true;
                    }
                }
            } else {
                signin = true;
            }
            if (signin){
                RegisterService.add($scope.signUp);
                $state.go('app.login');
            } else {
                $scope.error = true;
            }
        }
    };

  	$scope.initializeSignup = function(){
  		$scope.signUp = {};
  	};
})

app.controller('profileCtrl', function($scope, $location,$rootScope,$state,ProfileService,RegisterService) {

    $scope.things = RegisterService.getAll();

    $scope.initializeUser=function(){
        $scope.user={};
        $scope.user.gender ={};
        $scope.user.gender = "Male";
        $scope.user.address=[];
        $scope.user.qualification_details=[];
        $scope.user.experience_details=[];
        $scope.user.references=[];
        $scope.user.address.push({});
        $scope.user.qualification_details.push({});
        $scope.user.experience_details.push({});
        $scope.user.references.push({});
    }

    $scope.genList = [
        { text: "Male", value: "Male"},
        { text: "Female", value: "Female" }
    ];

    // $scope.$watch(function(){
    //     return $location.path();
    // }, function(value){
    //     console.log(value);
    // });

    $scope.save = function(isValid){
        if (isValid){
            $rootScope.user = $scope.user;
            ProfileService.add($scope.user);
            $state.go('app.profileMenu');
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
        if (isValid){
            if ($scope.page1 == true){
                if ($scope.user.phonePre.length == 2 && $scope.user.phoneNumber.length == 10){
                    $scope.page1 = false;
                    $scope.page2 = true;
                    $scope.value = "20";
                }
            } else
            if ($scope.page2 == true){
                $scope.page2 = false;
                $scope.page3 = true;
                $scope.value = "40";
            } else
            if ($scope.page3 == true){
                $scope.page3 = false;
                $scope.page4 = true;
                $scope.value = "60";
            } else
            if ($scope.page4 == true){
                $rootScope.user = $scope.user;
                $scope.page4 = false;
                $scope.page5 = true;
                $scope.value = "80";
            }
        }
    };

    $scope.prevPage = function(){
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
    };

    $scope.findOne = function(){
        var loggedInUser = [];
        for (var i=0;i<$scope.things.users.length;i++){
            if ($rootScope.user){
                if ($rootScope.user.email == $scope.things.users[i].email){
                    loggedInUser.push($scope.things.users[i]);
                }
            }
        }
        if ($rootScope.user){
            loggedInUser = loggedInUser[0];
            $scope.user.email = loggedInUser.email
        }
    }

    $scope.removeAddress = function (address) {
        var index = $scope.user.address.indexOf(address);
        $scope.user.address.splice(index, 1);
    };

    $scope.addAddress = function () {
        this.profileForm2.$submitted = false;
        $scope.user.address.push({});
    };

    $scope.addQualification = function () {
        this.profileForm3.$submitted = false;
        $scope.user.qualification_details.push({});
    };
    
    $scope.removeQualification = function (qualification) {
        var index = $scope.user.qualification_details.indexOf(qualification);
        $scope.user.qualification_details.splice(index, 1);
    };

     $scope.addExperience = function () {
        this.profileForm4.$submitted = false;
        $scope.user.experience_details.push({});
    };
    
    $scope.removeExperience = function (experience) {
        var index = $scope.user.experience_details.indexOf(experience);
        $scope.user.experience_details.splice(index, 1);
    };

    $scope.addReference = function () {
        this.profileForm5.$submitted = false;
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
        for (i = n; i>1900 ; i--) {
            $scope.dates.push(i);
        }
    };
    initDates();
})

app.controller('storageCtrl', function($scope, $location,ProfileService,$state,RegisterService) {
    $scope.things = RegisterService.getAll();
    console.log($scope.things);
    $scope.delete = function(thing){
        if (thing.dob){
            ProfileService.remove(thing);
        } else {
            RegisterService.remove(thing);
        }
    }

    $scope.logOut=function(){
        $state.go('app.login');
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

.controller('HomeCtrl', function($scope, $state, ionicMaterialMotion, ionicMaterialInk, $timeout,RegisterService,AuthenticationService) {
    $scope.things = RegisterService.getAll();
    $scope.user = $scope.things.profile[0];
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.address = function(){
        $scope.address={}
        var Permanent = {};
        var permanent = false;
        var office = false;
        var temporary = false;
        var Office = {};
        var Temporary = {};
        if ($scope.user){
            for (var i=0;i<$scope.user.address.length;i++){
                if ($scope.user.address[i].addressType == "Permanent Address"){
                    permanent = true;
                    Permanent = $scope.user.address[i];
                } else
                if ($scope.user.address[i].addressType == "Office Address"){
                    office = true;
                    Office = $scope.user.address[i];
                } else
                if ($scope.user.address[i].addressType == "Temporary Address"){
                    temporary = true;
                    Temporary = $scope.user.address[i];
                }
            }
        }

        if (permanent == true){
            $scope.address = Permanent;
        } else
        if (office == true && permanent == false){
            $scope.address = Office;
        } else
        if (temporary == true && office == false && permanent == false){
            $scope.address = Temporary;
        }
    };
})

.controller('logCtrl', function($scope, AuthenticationService,ProfileService) {
    $scope.logOut=function(){
        AuthenticationService.ClearCredentials();
        $scope.visible=false;
    };
//    $scope.initialize=function(){
//        if (ProfileService.getAll().cookies){
//            $scope.visible=true;
//        } else {
//            $scope.visible=false;
//        }
//    }
})

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})