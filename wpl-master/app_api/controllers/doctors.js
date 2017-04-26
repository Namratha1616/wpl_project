var mongoose = require('mongoose');
var Doctor = mongoose.model('Doctor');
var User = mongoose.model('User');

module.exports.doctorInsert = function(req,res){
  var doctor = new Doctor();
  console.log('request', req.body);
  doctor.doctor_name = req.body.doctor_name;
  doctor.doctor_email = req.body.doctor_email;
  doctor.speciality =  req.body.speciality;
 
  console.log("Controller Called");

            doctor.save(function (err) {
   			if(!err)
   				{
     				res.status(200).json(doctor);
   	     		}
   	    });

};


//update based on email
module.exports.doctorUpdate = function(req, res) {
console.log(req.body)
  
  var doctor = new Doctor();
  doctor.doctor_name = req.body.doctor_name;
  //doctor.doctor_email = req.body.doctor_email;
  doctor.speciality = req.body.speciality;
    
  Doctor.findOne({doctor_email: req.body.doctor_email }, function(err,doc){  

    doc.doctor_name= req.body.doctor_name, 

    doc.save(function(err, doctor) {
    if (!err){ console.log(doctor);res.status(200).json(doctor);}
    else
    {
      console.error("error"+err);
      console.log("errrrrr");
    }
  });

 });

};


//find all doctors 
module.exports.doctorAll = function(req, res) {

    Doctor
      .find({})
      .exec(function(err, doctor) {
        res.status(200).json(doctor);
        //console.log(appointment);
      });

};


//find the speciality of doctors
module.exports.doctorSpeciality = function(req,res){
  Doctor
  //.find({}).select("speciality - _id")
  .distinct("speciality")
  .exec(function(err, doctor){
    res.status(200).json(doctor);
    console.log("Obtaining speciality");
  });
};



//Delete based on email
module.exports.doctorDelete = function(req,res){
	 Doctor.remove({'doctor_email' : req.body.doctor_email}, function (err,doctor){
	 	console.log("err");
	 	if(!err){
	 		res.status(200).json(doctor);
	 		console.log("Deleted");
	 	}
	 });

};


module.exports.doctorSearchByName=function(req,res){
var doctor_name = req.body.doctor_name;
console.log(doctor_name);
Doctor.find({doctor_name:doctor_name}, function(err,doctor){
	console.log("err");
	if(!err){
		res.status(200).json(doctor);
	}
});
};

module.exports.doctorSearchBySpeciality = function(req,res){
var speciality = req.params.speciality;
var results = [];
console.log("####");
console.log(speciality);
Doctor.find({speciality:speciality},{doctor_name:1, _id:0})
  .exec(function(err,doctor){
  //console.log("err");
  for (i in doctor) {
    results.push(doctor[i].doctor_name);
  }
   console.log("working");
    res.status(200).json(results);
  });
};





