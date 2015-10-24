// The responsibility of this controller is to display the user details
(function() {

    function UserController(
      $scope, 
      github,
      $routeParams
    ) {
        
        var onUserComplete = function(data){
          $scope.user = data;
          $scope.error_message ="";
          
          github.getRepos($scope.user).then(onRepoComplete, onError);
        };
        
        var onError = function(reason){
          $scope.error_message = "could not get data";
          $scope.user = "";
        };
        
        var onRepoComplete = function(data){
          $scope.repos = data;
        };
        
        
        // The default sorting order
        $scope.repoSortOrder = "-stargazers_count";
        $scope.username = $routeParams.username;
        github.getUser($scope.username).then(onUserComplete, onError);
    }

    var app = angular.module("app");
    app.controller("UserController", ["$scope", "github", "$routeParams", UserController]);
})();

