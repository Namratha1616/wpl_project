var app = angular.module('meanApp')

app.controller('patientCtrl', ['$location', 'authentication','$http','$scope','meanData', 
	function($location, authentication, $http,$scope, meanData) {
	
	var vm = this;
    $scope.specialities = [];
    $scope.names = [];


    vm.selectSpeciality = function(){
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

    vm.selectedValue = function(item){
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

   vm.onSub = function () {
   	
      console.log("Hey there");
      var vm = this;
      vm.newAppointment = {
      	           email: '',
                   date: '',
                   time: '',
                   speciality: '',
                   doctor: '',
                   complain: ''

    //time_start: '',
    //time_end: ''
  }  
   //vm.newAppointment.email: authentication.currentUser().email;
    var cUser = authentication.currentUser();
    vm.newAppointment.email = cUser.email;
     console.log(vm.newAppointment);
      
     //console.log(vm.newAppointment.email);
      //validations to add new appointment
      vm.errorMessages = [];
      console.log("&&&&&&");
      if(vm.newAppointment.date == undefined || vm.newAppointment.time == undefined || vm.newAppointment.complain == undefined || vm.newAppointment.complain == '') {
      vm.errorMessages.push("All three fields are requied!");
      return;
    }

    if(vm.newAppointment.complain.length < 10) {
      vm.errorMessages.push("Complain must be at least 10 characters long!");
    }

    if(vm.newAppointment.date < new Date()) {
      vm.errorMessages.push("You can only add a future appointment!");
    }

  
    if(8 > vm.newAppointment.time.getHours() || vm.newAppointment.time.getHours() > 16) {
      vm.errorMessages.push("Appointment must be between 8am and 5pm!");
    }

    //console.log(vm.newAppointment);

   $http.post('/api/appointment/new',vm.newAppointment).success(function(data){
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
    

/*app.controller('updatePatientCtrl',['$location', 'authentication','$http','$scope','meanData', 
	function($location, authentication, $http,$scope, meanData) {
    var vm = null;
    var appntment = JSON.parse(sessionStorage.user);
    vm.user = {
    	user_name: appntment.email,
    	user_email: appntment.name; 
    }
	
	}]);


app.controller('updateDoctorCtrl',['$http', 'authentication', '$location', function($http, authentication, $location) {
  console.log("update doctor controller is running...");
  var vm = this
  var doctor = JSON.parse(sessionStorage.doctor);
  vm.doctor = {
    doctor_name: doctor.doctor_name,
    doctor_email:  doctor.doctor_email,
    speciality: doctor.speciality,
    //time_start: doctor.time_start,
    //time_end: doctor.time_end
  }
  
  vm.onSubmit = function () {
    console.log('Submitting new form');
    $http.post('/api/admin/doctor/update', vm.doctor).success(function(data) {
      console.log('response..', data);
      $location.path('doctor');
    })
    .error(function (e) {
      console.log('error..', e);
    });
  }

}]);*/