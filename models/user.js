const { Schema, model } = require('mongoose');



const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  email: {
    type: String,
    required: [true, 'The mail is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});



// Esta funcion nos servira para sacar ciertos campos que no queremos devolver en la respuesta 
// como la password y la __v, usamos "function" en vez de "arrow" por que necesitamos el objeto this

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user
}


module.exports = model('User', UserSchema);

