(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective () {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
  };
  return ddo;
}

/*
   controller is not supposed to handle business logic directively,
   so this business logic work is better to be done in custom service
*/
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService){
  var narrow = this;
  //不要忘记把serchTerm绑定到$scope上啊啊阿！！！！
  narrow.term = "";

  narrow.getMatchedMenuItems = function (narrow.term) {
    MenuSearchService.getMatchedMenuItems(narrow.term);
  };
  narrow.found = MenuSearchService.getItems();

  console.log(narrow.found);

  narrow.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  var found = [];

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
      // params: {
      //   category: shortName
      // }
    });

    return response.then(function (response) {
      // process result and only keep items that match
      var foundItems = response.data;
      for(item in foundItems){
        if(item.description.indexOf(searchTerm) !== -1){
          found.push(item);
        }
      }
      // return processed items
      return found;
    });
  };

  service.getItems = function () {
    return found;
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };
}
})();
