(function () {
'use strict'

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyShoppingController($scope, ShoppingListCheckOffService) {
  $scope.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  $scope.buyItem = function(index) {
    ShoppingListCheckOffService.removeItem(index);
  }

}

AlreadyBoughtShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController($scope, ShoppingListCheckOffService) {
  $scope.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  var boughtItems = [];

  var toBuyItems = [{ name: 'cookies', quantity: 10},
               { name: 'fishes', quantity: 2},
               { name: 'pepsi', quantity: 4},
               { name: 'bananas', quantity: 5},
               { name: 'breads', quantity: 3}];

  service.getToBuyItems = function() {
    return toBuyItems;
  }

  service.getBoughtItems = function() {
    return boughtItems;
  }

  service.removeItem = function(index) {
    boughtItems.push(toBuyItems.splice(index, 1)[0]);
  }
}
})();
