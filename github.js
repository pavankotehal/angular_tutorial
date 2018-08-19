(function(){

    var github = function($http){

        var getUser = function(username){
            console.log("Username is "+ username);
            return $http.get('https://api.github.com/users/'+ username).then(function(response){
                return response.data;
            });
        };

        var getRepos = function(user){
            console.log("The repose_url is "+ user.repos_url);
            return $http.get(user.repos_url).then(function(response){
                return response.data;
            });
        };

        return {
            getUser: getUser,
            getRepos: getRepos
        };
    };

    var app = angular.module('githubViewer');
    app.factory("github", github);
}());