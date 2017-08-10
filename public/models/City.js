let mongoose = require ("mongoose");
let Schema = mongoose.Schema;

let CitySchema = new Schema({
  city: String,
  country: String,
  image: String,
})

module.exports = mongoose.model('CitySchema', CitySchema);
