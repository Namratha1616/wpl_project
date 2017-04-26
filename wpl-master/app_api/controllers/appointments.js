var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');
var User = mongoose.model('User');

module.exports.appointmentAll = function(req, res) {
  
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  else {
    //if(req.body.email == 'admin@healthcare.com')
    //{
      Appointment
      .find({})
      .exec(function(err,appointment) {
      res.status(200).json(appointment);  
    });
    }
    /*else if (User.find({email : req.body.email}))
    {
    Appointment
      .find({email: req.body.email})
      .exec(function(err, appointment) {
        res.status(200).json(appointment);
        //console.log(appointment);
      });  
    }
    else{
      res.status(200).json({"message" : "No current appointments"});
    }

    
  }*/

  /*if (!req.payload._id) {

    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
         console.log(user);
        res.status(200).json(user);

      });
  }*/

};


module.exports.appointmentInsert = function(req,res){
  var appointment = new Appointment();
  //console.log('request', req.body)
  console.log("!!!!!!!!!!");
 
  /*console.log("Yayyyyyy there is result coming from mongodb")
      .exec(function(err, user) {
         console.log(user);
        res.status(200).json(user);

      });*/
  //console.log(user);
  appointment.email = req.body.email;
  appointment.date = req.body.date;
  appointment.time = req.body.time;
  appointment.patient_name = req.body.name;
  appointment.complain = req.body.complain;
  appointment.speciality = req.body.speciality;
  appointment.doctor = req.body.doctor;
  appointment.save(function (err) {
    console.log(err);
    //console.log("Error is in appointmentInsert");
   if(!err)
   {
     res.status(200).json(appointment);
   }
  });

};

module.exports.appointmentUpdate = function(req, res) {
console.log(req.body)
  
  var appointment = new Appointment();
  //appointment.email = req.body.email;
  //appointment.date = req.body.date;
  //appointment.time = req.body.time;
  
  Appointment.findOne({email: req.body.email }, function(err,doc){  
    doc.date= req.body.date; 
    doc.time= req.body.time;
    //doc.complain= req.body.complain;
    
    //doc.speciality = req.body.speciality;
    //doc.doctor = req.body.doctor;
    doc.save(function(err, appointment) {
    if (!err)res.status(200).json(appointment);
    else
    {
      console.error("error"+err);
      console.log("errrrrr");
    }
  });
  });

};