(function () {

  angular.module('meanApp', ['ngRoute']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      }).when('/appointment',{ 
        templateUrl: '/patient/appointment.view.html',
        controller:'appointmentCtrl',
        controllerAs:'vm'
      })/*.when('/appointment/new',{
        templateUrl: '/patient/addappointment.view.html',
        controller:'appointmentCtrl',
        controllerAs:'vm'
      })*/.when('/doctor',{
        templateUrl: '/admin/doctor/doctor.view.html',
        controller:'doctorCtrl',
        controllerAs:'vm'
      }).when('/doctor/new',{
        templateUrl:'/admin/doctor/add_doctor.view.html',
        controller:'insertdoctorCtrl',
        controllerAs:'vm'
      }).when('/update', {
      templateUrl: '/admin/doctor/update.view.html',
      controller: 'updateDoctorCtrl',
      controllerAs: 'vm'
    }).when('/patient/appointment/speciality',{
      templateUrl: '/patient/patient.view.html',
      controller: 'patientCtrl',
      controllerAs: 'vm'
    }).when('/patient/updateappointment',{
      templateUrl: '/patient/appointmentupdate.view.html',
      controller:'updatePatientCtrl',
      controllerAs: 'vm'
    })*/
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }
  
  angular
    .module('meanApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();