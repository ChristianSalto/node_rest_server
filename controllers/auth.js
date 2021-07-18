const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generaterJWT } = require('../helpers/jwt-generater');



const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {


    // Verificar si e email existe 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'user -> email does not exist'
      })
    }


    // Si el usuario esta activo 
    if (!user.status) {
      return res.status(400).json({
        msg: 'user -> status is not active'
      })
    }

    // Verificar la contraseña 
    const checkPasword = bcryptjs.compareSync(password, user.password);

    if (!checkPasword) {
      return res.status(400).json({
        msg: 'user -> password is not valid'
      })
    }

    // Generar el JWT
    const token = await generaterJWT(user.id)


    res.json({
      user,
      token
    })


  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: 'Internal Server Error'
    })

  }

}


module.exports = {
  login
}