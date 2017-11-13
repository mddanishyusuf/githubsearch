var app = angular.module('topgit',['ui.router','ngMaterial']);

app.controller('mainController',['$scope','$http','$rootScope','$mdDialog',function($scope, $http, $rootScope, $mdDialog){

    $scope.feedbackDialog = function(ev) {
      $mdDialog.show({
        template: '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScVC09Gw0n2W4LFV_v_50cT_LQbK2HMdQ4H_lAfFCrildWNFg/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
    }

}])

app.controller('homeController',['$scope','$http','$rootScope','$mdDialog',function($scope, $http, $rootScope, $mdDialog){
    $http.get('assets/author.json').success(function(res){
        $scope.image_show = res
        })
    $rootScope.title = 'Home | Explore GitHub Open Source Projects'
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
