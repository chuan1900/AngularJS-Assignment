(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];

function MenuDataService ($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: ( ApiBasePath + "/categories.json")
    });

    return response.then(function success(response) {
      var temp = response.data;
      console.log("$http categories length: "+ temp.length);
      return temp;
    }, function error(response) {
      console.log("ERROR");
    });
  };

 //还不是很清晰， 老师的意思
 //step 5: sub-2
  service.getItemsForCategory = function (categoryShortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category="+ categoryShortName),
      params: {
                category: categoryShortName
              }
    });

    return response.then (function success(response) {
      var temp2 = response.data;
      console.log("$http item length: "+ temp2.menu_items.length);
      return temp2;
    }, function error(response) {
      console.log("Get items ERROR.");
    });
  };
}


})();
