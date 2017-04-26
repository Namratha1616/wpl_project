var app = angular.module('meanApp')

app.controller('patientCtrl', ['$location', 'authentication','$http','$scope','meanData', 
	function($location, authentication, $http,$scope, meanData) {
	
	var vm = this;
    $scope.specialities = [];
    $scope.names = [];
    //vm.newAppointment = [];

    $scope.logout = function(){
      alert("clicked");
      console.log("logout");
      authentication.logout();
      $location.path('/login');
    }

    $scope.selectSpeciality = function(){
	$http.get('/api/admin/doctor/speciality').
	success(function(result)
	{
		$scope.specialities = result;
		console.log($scope.specialities);
	})
	.error(function(e)
	{
		console.log(e);
	})
    }

    $scope.selectedValue = function(item){
    	console.log(item);
    var config = {
                params: {speciality: item}
            };
	
    $http.get('/api/admin/doctor/findspeciality/'+item/*, {params: {speciality: item}}*/).
    success(function(data)
  {
  	$scope.names = data;
  	console.log("successful");
  	console.log($scope.names);
  })
  .error(function(e)
  {
  	console.log(e);
  })


    }

    /* var doctor = JSON.parse(sessionStorage.doctor);
  vm.doctor = {
    doctor_name: doctor.doctor_name,
    doctor_email:  doctor.doctor_email,
    speciality: doctor.speciality,
    //time_start: doctor.time_start,
    //time_end: doctor.time_end
  }*/

   $scope.onSub = function () {
   	
      console.log("Hey there");
      //var vm = this;
      //var newAppointment = JSON.parse(sessionStorage.newAppointment)
      /*vm.newAppointment = {
      	           email: '',
                   date: '',
                   time: '',
                   speciality: '',
                   doctor: '',
                   complain: ''

    //time_start: '',
    //time_end: ''
  }*/  
   //vm.newAppointment.email: authentication.currentUser().email;
    /*var cUser = authentication.currentUser();
    vm.newAppointment.email = cUser.email;*/
     console.log($scope.newAppointment);
      
     //console.log(vm.newAppointment.email);
      //validations to add new appointment
      $scope.errorMessages = [];
      console.log("&&&&&&");
      
      if($scope.newAppointment.email == undefined || $scope.newAppointment.date == undefined || $scope.newAppointment.time == undefined || $scope.newAppointment.complain == undefined || $scope.newAppointment.complain == '') {
      $scope.errorMessages.push("All three fields are requied!");
      return;
    }
      //console.log("3333333333");
    if($scope.newAppointment.complain.length < 10) {
      $scope.errorMessages.push("Complain must be at least 10 characters long!");
    }

    if($scope.newAppointment.date < new Date()) {
      $scope.errorMessages.push("You can only add a future appointment!");
    }

  
    if(8 > $scope.newAppointment.time.getHours() || $scope.newAppointment.time.getHours() > 16) {
      $scope.errorMessages.push("Appointment must be between 8am and 5pm!");
    }

    console.log($scope.newAppointment);

   $http.post('/api/appointment/new',$scope.newAppointment).success(function(data){
        console.log("Success");
        //redirect to appointment view page after successfully inserted/posted to db
        $location.path('/appointment');

      }).error(function(error){
        console.error("error in inserting data", error);
      })

  }

  app.filter('startFrom', function() {
  return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
      }
    });
	}]);
    



app.controller('updatePatientCtrl',['$location', 'authentication','$http','$scope','meanData', 
	function($location, authentication, $http,$scope, meanData) {
    var vm = this;
     $scope.updateAppointment = [];
	
	$scope.onSubmit = function(){
		console.log("Updating appointment");
		$http.post('/api/appointment/update', $scope.updateAppointment).success(function(data){
			console.log("Happening in updation");
			console.log('response..', data);
			$location.path('/appointment');
		})
		.error(function(e)
		{
			console.log("error",e);
		});
	}
	}]);


