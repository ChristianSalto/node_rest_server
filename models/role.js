const { Schema, model } = require('mongoose');


const UserSchema = Schema({
  role: {
    type: String,
    required: [true, 'The role is obligatory']
  }
});



module.exports = model('Role', UserSchema);