// Code goes here
(function() {

    function MainController(
      $scope, 
      $interval, 
      $location
    ) {
        
        $scope.search = function(username){
          cancelCountdownInterval();
          
          // change the client URL to /user/someuser - this will route automatically using the routing feature to UserController
          $location.path("/user/" + username);
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
        
        
        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();
    }

    var app = angular.module("app");
    app.controller("MainController", ["$scope", "$interval", "$location", MainController]);

})();
