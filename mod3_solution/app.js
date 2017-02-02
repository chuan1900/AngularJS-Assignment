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
    },
    controller: NarrowItDownController,
		controllerAs:'narrowList',
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
  narrow.searchTerm = " ";
  narrow.found = [];

  narrow.getMatchedMenuItems = function () {
    console.log("searchTerm: " + narrow.searchTerm);
    //narrow.found = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
    MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
    narrow.found = MenuSearchService.getItems();
    console.log("found items: " + narrow.found.length);
  };


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
    });

    return response.then(function (response) {
      // process result and only keep items that match
      var tempList = [];
      var foundItems = response.data.menu_items;
      //!!!!!记得 以下for循环中 item 为 index， 而不是object!!!!!!!
      // for(var item in foundItems){
      //   console.log("description: " + item.description);
      //   if(item.description.indexOf(searchTerm) !== -1){
      //     tempList.push(item);
      //   }
      // }
      for(var i =0; i < foundItems.length; i++){
			 	var description = foundItems[i].description;

			 	if(description.indexOf(searchTerm) > 0){
			 		found.push(foundItems[i]);
			 	    //console.log(description);
            //console.log(foundItems[i]);
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
