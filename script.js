var app = angular.module('blogApp', ['ngRoute']);

// define your controller here

var blogController = function($scope, appName, github, $interval, $log, $location, $anchorScroll){
    
    var decrementCountdown = function(){
      $scope.countdown -= 1;
      if($scope.countdown < 1){
        $scope.search($scope.username);
      }
    };

    var onSuccess = function(data){
      $scope.repos = data;
      $location.hash("user_details");
      $anchorScroll();
    };

    var countDownInterval = null;
    
    var startCountDown = function(){
      countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
      
    };

    var onComplete = function(data){
      $scope.user = data;
      github.getRepos($scope.user).then(onSuccess, onError);
  };

    /*
    var onComplete = function(response){
        $scope.user = response.data;
        $http.get($scope.user.repos_url).then(onSuccess, onError);
    };
    */

    var onError = function(reason){
      $log.error('')
      $scope.error = "Could not fetch the User";
    };

    $scope.search = function(username){
      $log.info("searching for the user "+ username);
      $scope.user = github.getUser(username);
      console.log("the $scope.user is "+ $scope.user.name);
      //$scope.repos = github.getRepos($scope.user);
      github.getUser(username).then(onComplete, onError);

      if(countDownInterval){
        $interval.cancel(countDownInterval);
        $scope.countdown = null;
      }
    };

    $scope.message = "Hello from blog controller";
    $scope.appName = appName.app_name;
    $scope.username = 'angular';
    $scope.countdown = 5;
    startCountDown();
};

// REGISTER YOUR CONTROLLERS

app.controller('blogController', blogController);

// angular constant

app.constant('appName', {app_name: 'My AngularJS Application !'});