let mongoose = require ("mongoose");
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
  name: String,
  password: String,
  hometown: String
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
