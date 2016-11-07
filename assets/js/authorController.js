app.controller('authorPageController',['$scope', '$http', '$stateParams', '$window', '$rootScope','$state',function($scope, $http, $stateParams, $window, $rootScope, $state){
	$scope.author_show = false
	$scope.loader = true
    $scope.showLoadMore = false
	var colors = ['rgba(236,100,75,0.5)','rgba(210, 77, 87,0.5)','rgba(242, 38, 19,0.5)','rgba(150, 40, 27,0.5)','rgba(239, 72, 54,0.5)','rgba(214, 69, 65,0.5)','rgba(192, 57, 43,0.5)','rgba(207, 0, 15,0.5)','rgba(231, 76, 60,0.5)','rgba(219, 10, 91,0.5)','rgba(246, 71, 71,0.5)','rgba(241, 169, 160,0.5)','rgba(210, 82, 127,0.5)','rgba(224, 130, 131,0.5)','rgba(246, 36, 89,0.5)','rgba(226, 106, 106,0.5)','rgba(220, 198, 224,0.5)','rgba(102, 51, 153,0.5)','rgba(103, 65, 114,0.5)','rgba(174, 168, 211,0.5)','rgba(145, 61, 136,0.5)','rgba(154, 18, 179,0.5)','rgba(191, 85, 236,0.5)','rgba(190, 144, 212,0.5)','rgba(142, 68, 173,0.5)','rgba(155, 89, 182,0.5)','rgba(68,108,179,0.5)','rgba(228, 241, 254,0.5)','rgba(65, 131, 215,0.5)','rgba(89, 171, 227,0.5)','rgba(129, 207, 224,0.5)','rgba(82, 179, 217,0.5)','rgba(197, 239, 247,0.5)','rgba(34, 167, 240,0.5)','rgba(52, 152, 219,0.5)','rgba(44, 62, 80,0.5)','rgba(25, 181, 254,0.5)','rgba(25, 181, 254,0.5)','rgba(34, 49, 63,0.5)','rgba(107, 185, 240,0.5)','rgba(30, 139, 195,0.5)','rgba(58, 83, 155,0.5)','rgba(52, 73, 94,0.5)','rgba(103, 128, 159,0.5)','rgba(37, 116, 169,0.5)','rgba(78,205,196,0.5)','rgba(162, 222, 208,0.5)','rgba(135, 211, 124,0.5)','rgba(38, 166, 91,0.5)','rgba(3, 201, 169,0.5)','rgba(104, 195, 163,0.5)','rgba(101, 198, 187,0.5)','rgba(27, 188, 155,0.5)','rgba(27, 163, 156,0.5)','rgba(102, 204, 153,0.5)','rgba(54, 215, 183,0.5)','rgba(200, 247, 197,0.5)','rgba(134, 226, 213,0.5)','rgba(235, 149, 50,0.5)']
	var autor_repository = []
	$scope.autor = $stateParams.author
	$scope.page_no = 1
	$rootScope.title = $scope.autor + ' Page'
	var autor_url = 'https://api.github.com/users/'+ $scope.autor
	var repo_url = 'https://api.github.com/users/'+$scope.autor+'/repos?sort=updated&page='+$scope.page_no+'&per_page=100'	
	$http.get(autor_url).success(function(autor_responce_data){
		$scope.author_data = autor_responce_data
			$http.get(repo_url).success(function(repo_responce_data){
				for (var i = 0; i < repo_responce_data.length; i++) {
		            autor_repository.push(repo_responce_data[i]);
		            autor_repository[i]['color'] = colors[Math.floor(Math.random()*colors.length)];
		        }
				$scope.repo_data = autor_repository
			})
	}).finally(function(){
		$scope.author_show = true
		$scope.loader = false
	})

	$scope.loadMore = function(){	
	$scope.showLoadMore = true
	$scope.page_no = $scope.page_no + 1;
	var repo_url = 'https://api.github.com/users/'+$scope.autor+'/repos?sort=updated&page='+$scope.page_no+'&per_page=100'	
		$http.get(repo_url).success(function(repo_responce_data){
				for (var i = 0; i < repo_responce_data.length; i++) {
		            autor_repository.push(repo_responce_data[i]);
		            autor_repository[i]['color'] = colors[Math.floor(Math.random()*colors.length)];
		            console.log(autor_repository[i]['color'])
		        }
				$scope.repo_data = autor_repository
			}).finally(function(){
		$scope.showLoadMore = false
	})
	}
}])