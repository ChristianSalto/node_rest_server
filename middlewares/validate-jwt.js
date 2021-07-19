const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: "There isn't token in the request"
    });
  };


  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT);

    // leer usuario que corresponde al uid
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Token no valido - El usuario no exite en la BD'
      });
    }

    if (user.status) {
      return res.status(401).json({
        msg: 'Token no valido - Usuario con estado: false'
      });
    }

    req.user = user;

    next();

  } catch (err) {


    res.status(401).json({
      msg: 'Token is not validate',
    });

  }

}

module.exports = {
  validateJWT,
}