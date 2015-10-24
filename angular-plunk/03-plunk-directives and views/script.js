// Code goes here
(function(angular) {

    function MainController($scope, $http) {
        
        var onUserComplete = function(response){
          $scope.user = response.data;
          $scope.error_message ="";
          
          $http.get($scope.user.repos_url).then(onRepoComplete, onError);
        };
        
        var onError = function(reason){
          $scope.error_message = "could not get data";
          $scope.user = "";
        };
        
        var onRepoComplete = function(response){
          $scope.repos = response.data;
        };
        
        $scope.search = function(username){
          $http.get("https://api.github.com/users/" + username).
            then(onUserComplete, onError);
        };
        
        // The default sorting order
        $scope.repoSortOrder = "-stargazers_count";
        $scope.username = "angular";
        $scope.message = "Github Viewer!";
    }

    angular.module("app", []).controller("MainController", ["$scope","$http", MainController]);

})(angular);