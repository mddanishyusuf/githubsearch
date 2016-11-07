var app = angular.module('topgit',['ui.router','ngMaterial']);

app.controller('homeController',['$scope','$http','$rootScope',function($scope, $http, $rootScope){
    $http.get('assets/author.json').success(function(res){
        $scope.image_show = res
        })
    $rootScope.title = 'Home | Explore Github Open Source Projects'
}])

app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
});
