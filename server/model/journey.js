var mongoose = require('mongoose'),
    User = require('./user'),
    Passenger = require('./passenger');

var journeySchema = new mongoose.Schema({
    driver:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    date:{type:Date, default:Date.now},
    origin:String,
    destination:String,
    cost: Number,
    passengers:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Passenger"
        }]
});

module.exports = mongoose.model("Journey",journeySchema);