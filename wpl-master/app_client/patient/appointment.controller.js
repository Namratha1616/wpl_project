(function() {
  
  var app = angular
    .module('meanApp'/*,['ngTouch','ui.grid', 'ui.grid.pagination']*/)
    .controller('appointmentCtrl', appointmentCtrl);

  appointmentCtrl.$inject = ['$location', 'authentication','$http','$scope','meanData'];
  function appointmentCtrl($location, authentication, $http,$scope, meanData) {

    var vm = this;
    vm.appointments = []
    vm.currentPage = 0;
    vm.pageSize = 3;
    vm.user = {};

    vm.logout = function(){
      alert("clicked");
      console.log("logout");
      authentication.logout();
      $location.path('/login');
    }

      vm.numberOfPages=function(){
        return Math.ceil(vm.appointments.length/vm.pageSize);                
      }
    console.log("hello");

    //display appointments
     var user = JSON.parse(sessionStorage.user);
    $http.get('/api/appointment', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      }).success(function(data) {
        
        vm.appointments = data;
        console.log(vm.appointments);
          })
      .error(function (e) {
        console.log(e);
      });

      //redirect to Add Appointment page after list appointment page
      $scope.redirectAddApp = function(){
      $location.path('/patient/appointment/speciality');
      }
      
      $scope.updateApp = function(){
      $location.path('/patient/updateappointment');
     }

   };


//pagination code

//let's make a startFrom filter
app.filter('startFrom', function() {
  return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
      }
    });

})();
      
