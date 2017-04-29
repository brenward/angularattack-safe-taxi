var User = require('../model/user'),
    Passenger = require('../model/passenger'),
    Journey = require('../model/journey'),
    express = require("express"),
    router = express.Router({mergeParams:true}),
    passport = require("passport"),
    mongoose = require('mongoose');

router.post('/new',passport.authenticate('jwt', { session: false }),function(req,res){
    if(req.user.roles == 'driver'){
        var driver = {id:req.user._id,username:req.user.username};
        var origin = req.body.origin;
        var destination = req.body.destination;
        var cost = parseInt(req.body.cost);
        var passengers = [];

        var passArray = req.body.passengers;

        var newJourney = {driver:driver,origin:origin,destination:destination,cost:cost,passengers:passengers};

        Journey.create(newJourney,function(err,journey){
            if(err){
                res.status(500);
                res.json("Error creating journey");
            }else{
                createPassengers(function(result,count, expectedSize){
                    journey.passengers = result;
                    if(count === expectedSize){
                        journey.save();
                    }                
                },passArray);  
                res.json("Journey created successfully");
            }
        });
     }else{
         res.status(401);
         res.json("Not permitted to add Journey");
     }      
});

router.post('/edit',passport.authenticate('jwt', { session: false }),function(req,res){
    if(!mongoose.Types.ObjectId.isValid(req.body.id)){      
        res.status(404);
        res.json("Journey not found");
    }else{       
        if(req.user.roles == 'driver'){ 
            Journey.findById(req.body.id,function(err,journey){
                if(err){
                    res.status(500);
                    res.json("An error has occured");
                }

                if(!journey){
                    res.status(404);
                    res.json("Journey not found");
                }else{
                    journey.origin = req.body.origin;
                    journey.destination = req.body.destination;
                    journey.cost = parseInt(req.body.cost);

                    var passArray = req.body.passengers;

                    createPassengers(function(result,count, expectedSize){
                        journey.passengers = result;
                        if(count === expectedSize){
                            journey.save();
                        }                
                    },passArray);
                    res.json("Journey edited successfully"); 
                }
            });
        }else{
            res.status(401);
            res.json("Not permitted to edit Journey");
        }
    }
});

router.get('/',passport.authenticate('jwt', { session: false }),function(req,res){
    if(req.user.roles == 'driver'){
        Journey.find({"driver.id":req.user.id}).populate("passengers").exec(function(err,data){
            if(err){
                res.status(500);
                res.json("error retrieving journies");
            }else{
                res.json(data);
            }
        });
    }else if(req.user.roles == 'regulator'){
        Journey.find({}).populate("passengers").exec(function(err,data){
            if(err){
                res.status(500);
                res.json("error retrieving journies");
            }else{
                res.json(data);
            }
        });
    }else{
        res.json("invalid credentials");
    }
});

function createPassengers(callback, passengers){
    var passengerArray = [];
    var count=0;
    var expectedSize = passengers.length;
    passengers.forEach(function(passenger){
        Passenger.create(passenger,function(err,data){
            if(err){
                console.log(err);
            }else{
                passengerArray.push(data);
                count++;
            }
            callback(passengerArray,count,expectedSize);
        });
    });
}

module.exports = router;

