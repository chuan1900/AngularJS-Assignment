(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoriesController', MainCategoriesController);


MainCategoriesController.$inject = ['categories'];
function MainCategoriesController(categories) {
  var mainList = this;
  mainList.categories = categories;
  //console.log("categories.length: " + categories.length);
}

})();
