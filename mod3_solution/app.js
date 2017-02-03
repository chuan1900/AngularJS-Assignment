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
      list: '<',
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
  narrow.searchTerm = "";
  narrow.found = [];

  narrow.searchItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

    //In order for data to appear in your template,
    //you're going to need to assign the value you get from your then(param)
    //and assign it to your controller.
    promise.then(function (response) {
      narrow.found = response;
      console.log("found items: " + narrow.found.length);
    })
    .catch(function (error) {
      console.log("error");
    })
  };

  narrow.removeItem = function (itemIndex) {
    narrow.found.splice(itemIndex, 1);
  };

  narrow.emptyList = function () {
		if(narrow.found.length === 0){
			return true;
		}else{
			return false;
		}
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

    return response.then(function success(response) {
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
			 		tempList.push(foundItems[i]);
			 	    //console.log(description);
            //console.log(foundItems[i]);
			 	}
			 }
      // return processed items
      return tempList;
    }, function error(response){
      console.log("ERROR");
    });
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };
}
})();
