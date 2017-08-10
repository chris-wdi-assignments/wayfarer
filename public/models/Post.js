let mongoose = require ("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  user: String,
  text: String,
  date: Date
})

module.exports = mongoose.model('Post', PostSchema);
