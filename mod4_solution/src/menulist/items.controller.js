(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['menuItems']
function ItemsController(menuItems) {
  var itemList = this;
  itemList.items = menuItems.menu_items;
  itemList.category = menuItems.category;
}

})();
