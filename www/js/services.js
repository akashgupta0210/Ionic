angular.module('app.services', [])

.factory ('RegisterService', function ($localStorage) {
	$localStorage.things = {};
	$localStorage.things.users=[];
	$localStorage.things.profile=[];
	$localStorage = $localStorage.$default({
  		things: {}
	});
	var _getAll = function () {
  		return $localStorage.things;
	};

	var _getUser = function () {
  		return $localStorage.things.users;
	};

	var _add = function (thing) {
  		$localStorage.things.users.push(thing);
	};

	var _remove = function (thing) {
  		$localStorage.things.users.splice($localStorage.things.users.indexOf(thing), 1);
	};

	return {
    	getAll: _getAll,
    	add: _add,
    	remove: _remove,
    	getUser: _getUser
  	};
})

.factory('ProfileService',function($localStorage){
	$localStorage.things.profile=[];
	$localStorage = $localStorage.$default({
  		things: {}
	});

	var _getProfile = function () {
  		return $localStorage.things.profile;
	};

	var _add = function (thing) {
  		$localStorage.things.profile.push(thing);
	};

	var _remove = function (thing) {
  		$localStorage.things.profile.splice($localStorage.things.profile.indexOf(thing), 1);
	};

	return {
    	add: _add,
    	remove: _remove,
    	getProfile: _getProfile
  	};

})