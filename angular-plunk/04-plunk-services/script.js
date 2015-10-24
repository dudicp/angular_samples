// Code goes here
(function(angular) {

    function MainController(
      $scope, 
      github, 
      $interval, 
      $log, 
      $anchorScroll, 
      $location
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
          
          // in this callback we have user details and repo ready.
          $location.hash("userDetails"); // sets the URL
          $anchorScroll(); // perform the actuall scroll
        };
        
        $scope.search = function(username){
          $log.info("Searching for username: " + username);
          github.getUser(username).then(onUserComplete, onError);
            
          cancelCountdownInterval();
        };
        
        var cancelCountdownInterval = function(){
          if(countdownIntervalHandler){
            $interval.cancel(countdownIntervalHandler);
            $scope.countdown = null;
          }
        };
        
        var decrementCountdown = function(){
          $scope.countdown = $scope.countdown - 1;
          if($scope.countdown <1){
            $scope.search($scope.username);
          }
        };
        
        var countdownIntervalHandler = null;
        var startCountdown =function(){
          countdownIntervalHandler = $interval(decrementCountdown, 1000, $scope.countdown);
        };
        
        
        // The default sorting order
        $scope.repoSortOrder = "-stargazers_count";
        $scope.username = "angular";
        $scope.message = "Github Viewer!";
        $scope.countdown = 5;
        startCountdown();
    }

    angular.module("app", []).controller("MainController", ["$scope","github", "$interval", "$log", "$anchorScroll", "$location", MainController]);

})(angular);