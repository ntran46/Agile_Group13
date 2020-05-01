var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// User Schema
var userSchema = mongoose.Schema({
  username:     { type: String, index:true },
  password:     { type: String },
  email:        { type: String, unique: true},
  firstName:    { type: String },
  lastName:     { type: String },
  roles:        { type: Array , default: 'Normal'},
  gender:       { type: String },
  address:      { type: String },
  zipcode:      { type: String },
  txtEmpPhone:  { type: String },

});
userSchema.plugin(passportLocalMongoose);
var User = module.exports = mongoose.model('User', userSchema);
module.exports = User;
