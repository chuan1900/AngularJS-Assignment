(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menulist/templates/main-categories.template.html',
    controller: 'MainCategoriesController as mainCategories',
    resolve: {
      //[] --> kind of an injection
      categories: ['MenuDataService', function (MenuDataService) {
         return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{catShortName}',
    templateUrl: 'src/menulist/templates/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      menuItems: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.catShortName);
            }]
    }
  });
}

})();
