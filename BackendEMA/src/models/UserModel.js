const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username : { type: String, required: true },
   email : {type : String , unique : true , required : true},
   password : {type :String, required : true},
   role : {type : String , enum : ['Admin', 'User'] , default : 'User'}
},
{
    versionKey: false
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
