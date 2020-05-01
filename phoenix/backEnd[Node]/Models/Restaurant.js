var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var restaurantSchema = mongoose.Schema({
  username:     { type: String, index:true },
  password:     { type: String },
  email:        { type: String },
  restaurant_name:    { type: String },
  strAddress:   { type: String },
  city:         { type: String },
  zipcode:      { type: String },
  phoneNo:      { type: String },
  location:     { type: Array },
  employees:    { type: Object }
});
restaurantSchema.plugin(passportLocalMongoose);
var Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
