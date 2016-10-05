(function () {
'use strict'

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'templates/foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.clickNarrow = function() {
    list.found = MenuSearchService.getMatchedMenuItems(list.searchTerm);
  };

  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex,1);
  };
}


MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    console.log('searchTerm variable is: ' + searchTerm);

    var foundItems = [];
    // If searchTerm is empty return empty response array
    if (searchTerm == undefined || searchTerm == '') {
      return foundItems;
    }

    $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'})
    .then(function successCallback(response) {
      var menu_items = response.data.menu_items;

      for (var i = 0; i < menu_items.length; i++) {
        if (menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(menu_items[i]);
        }
      }
     });
    return foundItems;
  };
}



})();
