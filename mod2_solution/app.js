(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
/*!!!!!!!Do remember to pass the ShoppingListCheckOffService as argument!!!!!!!*/
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getItems();
  toBuy.remove = function (itemIndex) {
    ShoppingListCheckOffService.remove(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getItemsBought();
  bought.remove = function (itemIndex) {
    ShoppingListCheckOffService.remove(itemIndex);
  };
}

function ShoppingListCheckOffService () {
  var service = this;
  var items = [
     {Name: "cookies", Quantity: 5},
     {Name: "chips  ", Quantity: 3},
     {Name: "sugar  ", Quantity: 5},
     {Name: "milk   ", Quantity: 3},
     {Name: "bread  ", Quantity: 2},
     {Name: "water  ", Quantity: 7}
   ];
   var itemsBought = [];

  service.getItems = function () {
    return items;
  };

  service.getItemsBought = function () {
    return itemsBought;
  }

  service.boughtFromBuy = function (index) {
    return items[index];
  };

  service.remove = function (index) {
    itemsBought.push(items[index]);
    items.splice(index, 1);
  }

}

})();
