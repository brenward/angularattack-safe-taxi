var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    roles: {
        type:String,
        enum:['driver','regulator'],
        default:'driver'
    }
});

module.exports = mongoose.model("User",userSchema);