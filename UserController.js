var app = angular.module('githubViewer');

// define your controller here

var UserController = function($scope, github, $routeParams){
    
    var onSuccess = function(data){
      $scope.repos = data;
      $location.hash("user_details");
    };

    var onComplete = function(data){
      $scope.user = data;
      github.getRepos($scope.user).then(onSuccess, onError);
  };

    var onError = function(reason){
      $log.error('')
      $scope.error = "Could not fetch the User";
    };

    console.log("the $scope.user is "+ $routeParams.username);
    $scope.username = $routeParams.username;
    github.getUser($scope.username ).then(onComplete, onError);

};

// REGISTER YOUR CONTROLLERS

app.controller('UserController', UserController);

// angular constant

app.constant('appName', {app_name: 'My AngularJS Application !'});