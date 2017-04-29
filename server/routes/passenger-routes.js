var Passenger = require('../model/passenger')
    express = require("express"),
    router = express.Router({mergeParams:true});

router.get('/all',passport.authenticate('jwt', { session: false }),function(req,res){
    Passenger.find(function(err,passengers){
        if(err){
            res.send(err);
        }else{
            res.send(passengers)
        }
    });
});

router.post('/new',passport.authenticate('jwt', { session: false }),function(req,res){

    var newPassenger = new Passenger();
    newPassenger.name = req.body.name;
    newPassenger.surname = req.body.surname;
    newPassenger.address = req.body.address;
    newPassenger.phone = req.body.phone;

    //existing = User.findOne({username:username})
    Passenger.create(newPassenger,function(err,data){
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });

});

router.get('/:passenger_id',passport.authenticate('jwt', { session: false }),function(req,res){
    Passenger.findById(req.params.passenger_id, function(err, passenger) {
            if (err){
                res.send(err);
            }else{
                 res.send(passenger);
            }
        });
});

router.put('/:passenger_id',passport.authenticate('jwt', { session: false }),function(req,res){
     Passenger.findById(req.params.passenger_id, function(err, passenger) {

             if (err){
                res.send(err);
            }else{

            passenger.name = req.body.name;
            passenger.surname = req.body.surname;
            passenger.address = req.body.address;
            passenger.phone = req.body.phone;
            
            passenger.save(function(err) {
                if (err){
                    res.send(err);
                }else{
                    res.send(passenger);
                }
            });
            }
        });
});

router.delete('/:passenger_id',passport.authenticate('jwt', { session: false }),function(req,res){
    console.log(req.params.passenger_id);
     Passenger.remove({
            _id: req.params.passenger_id
        }, function(err, passenger) {
            if (err){
                res.send(err);
            }else{
                res.send(passenger);
            }
        });
});

module.exports = router;