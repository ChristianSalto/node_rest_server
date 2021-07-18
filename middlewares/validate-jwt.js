const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: "There isn't token in the request"
    });
  };


  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT);

    req.uid = uid

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