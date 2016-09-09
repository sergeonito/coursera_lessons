(function () {
'use strict'

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunch_menu = '';

  $scope.check_items = function () {
    // parse string to array with cutting empty values
    var items = $scope.lunch_menu.split(',').filter(v=>v.trim()!='');
    if (items.length == 0) {
      $scope.message = 'Please enter data first';
      $scope.msg_style = {'color':'red','border':'1px solid red'}
    } else if (items.length <= 3) {
      $scope.message = 'Enjoy!';
      $scope.msg_style = {'color':'green','border':'1px solid green'}
    } else {
      $scope.message = 'Too much!';
      $scope.msg_style = {'color':'green','border':'1px solid green'}
    }
  }
}
})();
