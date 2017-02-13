(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menulist/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
