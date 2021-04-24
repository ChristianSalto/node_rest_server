const Role = require('../models/role');
const User = require('../models/user');

// Verificar si el rol se encuentra en la base de datos
const roleValidator = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`This role ${role} isn't DB`);
  }
}

// Verificar si el correo existe
const existsEmail = async (email = '') => {

  const checkMail = await User.findOne({ email });
  if (checkMail) {
    throw new Error("This email is already registered");
  }
}


const idValidatorUser = async (id) => {


  const checkIdUser = await User.findById(id);
  if (!checkIdUser) {
    throw new Error(`This id not exits ${id}`)
  }
}

module.exports = {
  roleValidator,
  existsEmail,
  idValidatorUser
}