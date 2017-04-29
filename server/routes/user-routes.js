var User = require('../model/user')
    express = require("express"),
    router = express.Router({mergeParams:true}),
    passport = require("passport"),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

secretOrKey = process.env.JWT_SECRET || 'our super secret key';

router.post('/login',function(req,res){
    console.log("Inside Login");
    
    User.findOne({username:req.body.username},function(err, data){
        if(err){
            res.status(500);
            res.send(err);
        }
        if(data){

            if(bcrypt.compareSync(req.body.password,data.password)){
                var returnObject = {_id: data._id,roles:data.roles};
                var token = jwt.sign(returnObject, secretOrKey);
                var user ={_id:data._id,roles:data.roles,username:data.username,token:token}
                res.json(user);
            }else{
                res.status(401);
                res.json("invalid credentials");
            }           
        }
        else{
                res.status(401);
                res.json("invalid credentials");
            }      
    });
});

router.post('/register',function(req,res){
    console.log(req.body);
    User.findOne({username:req.body.username},function(err, data){
        if(err){
            res.status(500);
            res.send(err);
        }else if(data){
            res.status(401);
            res.json("user exists");
        }else{
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.password = bcrypt.hashSync(req.body.password,5);
            User.create(newUser,function(err,data){
                if(err){
                    res.status(500);
                    res.send(err);
                }else{
                    var returnObject = {_id: data._id,roles:data.roles};
                    var token = jwt.sign(returnObject, secretOrKey);
                    var user ={_id:data._id,roles:data.roles,username:data.username,token:token}
                    res.json(user);

                }
            });
        }
    });
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("Success! You can not see this without a token");
});

module.exports = router;