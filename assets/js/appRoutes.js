app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {    
    $urlRouterProvider.otherwise('/home');    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'assets/views/home.html',
            controller: 'homeController'
        })

        .state('language', {
            url: '/language',
            templateUrl: 'assets/views/lang_search.html',
            controller: 'langPageController'
        })
        .state('language.lang', {
            url: '/:item_name',
            templateUrl: 'assets/views/search_result.html',
            controller: 'searchPageController'
        })
        .state('language.trending', {
            url: '/:item_name/:date',
            templateUrl: 'assets/views/search_result.html',
            controller: 'searchPageController'
        })

        .state('keyword', {
            url: '/keyword',
            templateUrl: 'assets/views/keyword_search.html',
            controller: 'keywordPageController'
        })
        .state('keyword.result', {
            url: '/:keywords',
            templateUrl: 'assets/views/search_result.html',
            controller: 'keywordResultPageController'
        })
        
        .state('author', {
            url: '/author/:author',
            templateUrl: 'assets/views/author.html',
            controller: 'authorPageController'      
        })
        
        .state('about', {
            url: 'assets/views/about',
            templateUrl: 'about.html'   
        });        
}]);