'use strict';

angular.module('myApp')

.config(function( $routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
})

.controller('View1Ctrl', function($scope, $http, $timeout) {
  
  var api_url = 'http://localhost:3000/v1/contacts';

  $scope.sendEmail = function () {
    $scope.spinner = true;
    $http.post(api_url, $scope.contact)
    .then(function(response){
      $scope.status = response.status;
      $scope.data = response.data;
      $scope.spinner = false;
      if($scope.status != 201){
        $scope.message = 'Error sending your email. Try Again, please.';
      }else{
        $scope.message = 'Email sent! Please, check out your email.';
      }

      $timeout(function(){        
        $scope.message = undefined;
      },5000);

    }, function(response) {
      $scope.data = response.data || 'Request failed';
      $scope.status = response.status;
      $scope.spinner = false;
    });
  }

  


});