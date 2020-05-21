var mongoose              = require('mongoose');

var restaurantSchema = mongoose.Schema({
  email:          { type: String, index: true },
  restaurantName: { type: String },
  strAddress:     { type: String },
  city:           { type: String },
  zipcode:        { type: String },
  phoneNo:        { type: String, unique: true},
  license:        { type: String, unique: true},
  description:    { type: String },
  menu:           { type: Array },
  branchLocation: { type: Array },
  employees:      { type: Object },
  comments :      { type: Object },
  isApproved:     { type: Number, default: 0}
}, 
{
  versionKey: false
});

var Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
