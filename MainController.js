var app = angular.module('githubViewer');

// define your controller here

var MainController = function($scope, appName, $interval, $location){
    
    var decrementCountdown = function(){
      $scope.countdown -= 1;
      if($scope.countdown < 1){
        $scope.search($scope.username);
      }
    };

    var countDownInterval = null;

    var startCountDown = function(){
      countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
      
    };
  
    $scope.search = function(username){
      if(countDownInterval){
        $interval.cancel(countDownInterval);
        $scope.countdown = null;
      }
      $location.path("/user/" + username);
    };

    $scope.appName = appName.app_name;
    $scope.username = 'angular';
    $scope.countdown = 5;
    startCountDown();
};

// REGISTER YOUR CONTROLLERS

app.controller('MainController', MainController);

// angular constant

app.constant('appName', {app_name: 'My AngularJS Application !'});