var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var appointmentSchema = new mongoose.Schema({
	 email:{type:String,unique : true},
	 date:{type:Date},
     time:{type:String},
     patient_name:{type:String},
     complain:{type:String},
     speciality:{type:String},
     doctor:{type:String}
 
});


mongoose.model('Appointment', appointmentSchema);
