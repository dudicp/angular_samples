// Code goes here
(function(angular) {

    function MainController($scope, $http) {
        
        var onUserComplete = function(response){
          $scope.user = response.data;
        };
        
        var onGetUserError = function(reason){
          $scope.error_message = "could not get user";
        }
        
        $http.get("https://api.github.com/users/robconery").then(onUserComplete, onGetUserError);
      
        $scope.message = "Hello World!";
    }

    angular.module("app", []).controller("MainController", ["$scope","$http", MainController]);

})(angular);