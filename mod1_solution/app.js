(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.dishes = "";
  // console.log("$scope.dishes_length: "+$scope.dishes.length);
  $scope.checkMessage = "";

  $scope.displayMessage = function () {
    var message = checkDishes($scope.dishes);
    $scope.checkMessage = message;
  };

  function checkDishes(string) {
    var comma = ',';
    var arrayOfStrings = string.split(comma);
    var length = arrayOfStrings.length;

    if(arrayOfStrings[0] == ''){
      return "Please enter data first";
    }else if(length < 4){
      return "Enjoy!";
    }else{
      return "Too Much!";
    }
  }
}

})();
