(function(){
  
  var github = function($http){
    
    var getUser = function(username){
      return $http.get("https://api.github.com/users/" + username)
                  .then(function(response){
                    return response.data;
                  });
    };
    
    var getRepos = function(user){
      return $http.get(user.repos_url)
                  .then(function(response){
                    return response.data;
                  });
    };
    
    var getRepoDetails = function(username, reponame){
      var repoResult; // repo details and collaborators.
      var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
      
      // perform chain promises (2 api calls) one after the other.
      // each return is the input of the next success function.
      return $http.get(repoUrl)
              .then(function(response){
                repoResult = response.data;
                return $http.get(repoUrl + "/collaborators");
              })
              .then(function(response){
                repoResult.collaborators = response.data;
                return repoResult;
              });
    };
    
    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails : getRepoDetails
    };
    
  };
  
  var module = angular.module("app");
  module.factory("github", github);
  
}());