// The responsibility of this controller is to display the repo details
(function() {

    function RepoController(
      $scope, 
      github,
      $routeParams
    ) {
      
      var onRepoDetailsCompleted = function(data){
        $scope.repo = data;
      }
      
      var onError = function(reason){
        $scope.error = reason;
      };
      
      var reponame = $routeParams.reponame;
      var username = $routeParams.username;
      
      github.getRepoDetails(username, reponame)
        .then(onRepoDetailsCompleted, onError);
    }

    var app = angular.module("app");
    app.controller("RepoController", ["$scope", "github", "$routeParams", RepoController]);
})();