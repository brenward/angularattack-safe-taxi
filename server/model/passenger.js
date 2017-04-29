var mongoose = require('mongoose');

var passengerSchema = new mongoose.Schema({
    name: String,
    surname: String,
    address:[String],
    phone:String
});

module.exports = mongoose.model("Passenger",passengerSchema);