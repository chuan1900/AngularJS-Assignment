(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menulist/templates/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
