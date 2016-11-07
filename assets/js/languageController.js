app.controller('langPageController',['$scope','$window','$rootScope',function($scope, $window, $rootScope){
    $scope.popupHeight = $window.innerHeight;
    $scope.showTopGitList = true
    $scope.gitList = false
    $scope.load_more = 0
    $rootScope.title = 'Search Repositories by Language'
}])

app.controller('searchPageController',['$scope', '$http', '$stateParams', '$window', '$rootScope','$state',function($scope, $http, $stateParams, $window, $rootScope, $state){
    $scope.language_name = $stateParams.item_name
    $scope.page_no = $stateParams.page_no
    $scope.page_count = 1    
    $scope.language_page = true
    $scope.box_layout = true;
    $scope.list_layout = false;
    $scope.repo_range = 100;  
    $scope.repo_no_on_responce = 0;  
    var date1 = new Date();
    $rootScope.title = $stateParams.item_name + ' Repositories'
    $scope.today_date = date1.getFullYear() + '-' + ('0' + (date1.getMonth() + 1)).slice(-2) + '-' + ('0' + date1.getDate()).slice(-2);

    var date2 = new Date();
    date2.setDate(date2.getDate() - 7);
    $scope.last_weak_date = date2.getFullYear() + '-' + ('0' + (date2.getMonth() + 1)).slice(-2) + '-' + ('0' + date2.getDate()).slice(-2);

    var date3 = new Date();
    date3.setDate(date3.getDate() - 30);
    $scope.last_month_date = date3.getFullYear() + '-' + ('0' + (date3.getMonth() + 1)).slice(-2) + '-' + ('0' + date3.getDate()).slice(-2);
    var record = []

    if($stateParams.date){
        var url = 'https://api.github.com/search/repositories?q=language:' + $stateParams.item_name + '+created:"'+$stateParams.date+'..'+$scope.today_date+'"&page=1&per_page=100';
    }else{    
        var url = 'https://api.github.com/search/repositories?q=language:' + $stateParams.item_name + '&page=1&per_page=100';
    }

    var colors = ['rgba(236,100,75,0.5)','rgba(210, 77, 87,0.5)','rgba(242, 38, 19,0.5)','rgba(150, 40, 27,0.5)','rgba(239, 72, 54,0.5)','rgba(214, 69, 65,0.5)','rgba(192, 57, 43,0.5)','rgba(207, 0, 15,0.5)','rgba(231, 76, 60,0.5)','rgba(219, 10, 91,0.5)','rgba(246, 71, 71,0.5)','rgba(241, 169, 160,0.5)','rgba(210, 82, 127,0.5)','rgba(224, 130, 131,0.5)','rgba(246, 36, 89,0.5)','rgba(226, 106, 106,0.5)','rgba(220, 198, 224,0.5)','rgba(102, 51, 153,0.5)','rgba(103, 65, 114,0.5)','rgba(174, 168, 211,0.5)','rgba(145, 61, 136,0.5)','rgba(154, 18, 179,0.5)','rgba(191, 85, 236,0.5)','rgba(190, 144, 212,0.5)','rgba(142, 68, 173,0.5)','rgba(155, 89, 182,0.5)','rgba(68,108,179,0.5)','rgba(228, 241, 254,0.5)','rgba(65, 131, 215,0.5)','rgba(89, 171, 227,0.5)','rgba(129, 207, 224,0.5)','rgba(82, 179, 217,0.5)','rgba(197, 239, 247,0.5)','rgba(34, 167, 240,0.5)','rgba(52, 152, 219,0.5)','rgba(44, 62, 80,0.5)','rgba(25, 181, 254,0.5)','rgba(25, 181, 254,0.5)','rgba(34, 49, 63,0.5)','rgba(107, 185, 240,0.5)','rgba(30, 139, 195,0.5)','rgba(58, 83, 155,0.5)','rgba(52, 73, 94,0.5)','rgba(103, 128, 159,0.5)','rgba(37, 116, 169,0.5)','rgba(78,205,196,0.5)','rgba(162, 222, 208,0.5)','rgba(135, 211, 124,0.5)','rgba(38, 166, 91,0.5)','rgba(3, 201, 169,0.5)','rgba(104, 195, 163,0.5)','rgba(101, 198, 187,0.5)','rgba(27, 188, 155,0.5)','rgba(27, 163, 156,0.5)','rgba(102, 204, 153,0.5)','rgba(54, 215, 183,0.5)','rgba(200, 247, 197,0.5)','rgba(134, 226, 213,0.5)','rgba(235, 149, 50,0.5)']
        $http.get(url).success(function(git_data){
        $scope.total_github_repo = git_data.total_count
        for (var i = 0; i < git_data.items.length; i++) {
            record.push(git_data.items[i]);
            git_data.items[i]['color'] = colors[Math.floor(Math.random()*colors.length)];
        }
        $scope.repo_no_on_responce = $scope.repo_no_on_responce + git_data.items.length
        $scope.repo_record = record
        if($scope.repo_no_on_responce < $scope.repo_range){
            $scope.hide_loadMore = true
            $scope.last_message = git_data.message
        }
        $scope.last_star_value = git_data.items[git_data.items.length-1].stargazers_count
        }).finally(function() {
            $scope.showTopGitList = false
            $scope.gitList = true
        });
    $scope.loadMore = function(){
        $scope.load_more = 1
        $scope.shoeLoadMore = true
        if($scope.page_count == 11){
            $scope.page_count = 1
        }
        if($stateParams.date){
            var url = 'https://api.github.com/search/repositories?q=language:' + $stateParams.item_name + '+created:"'+$stateParams.date+'..'+$scope.today_date+'"&page=' + $scope.page_count + '&per_page=100';
        }else{    
            var url = 'https://api.github.com/search/repositories?q=language:' + $stateParams.item_name + '+stars:"<='+$scope.last_star_value+'"&page=' + $scope.page_count + '&per_page=100';
        }

        $http.get(url).success(function(git_data){
            for (var i = 0; i < git_data.items.length; i++) {
                record.push(git_data.items[i]);
                git_data.items[i]['color'] = colors[Math.floor(Math.random()*colors.length)];
            }
            if($scope.page_count == 10){
                $scope.last_star_value = git_data.items[git_data.items.length-1].stargazers_count
            }
            $scope.repo_record = record
            $scope.page_count = $scope.page_count + 1;
            $scope.repo_range = $scope.repo_range + 100;
            $scope.repo_no_on_responce = $scope.repo_no_on_responce + git_data.items.length
        }).finally(function(){            
            $scope.load_more = 0
        })
    }

    $scope.trending = function(item,x){
        $state.go('language.trending', {item_name:item,date:x})
    }

    $scope.boxLayout = function(){
        $scope.box_layout = true;
        $scope.list_layout = false;
    }

    $scope.listLayout = function(){
        $scope.box_layout = false;
        $scope.list_layout = true;        
    }
}])