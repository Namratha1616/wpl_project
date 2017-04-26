(function () {

  angular
    .module('meanApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : "",
      //role: ""
    };

   /* $scope.onChange = function(){

      vm.credentials.role=$scope.cmbAll;
    }
  */
    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
          alert("User already exists");
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }

})();