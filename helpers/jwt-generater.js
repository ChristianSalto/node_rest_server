const jwt = require('jsonwebtoken');



const generaterJWT = (uid = '') => {

  return new Promise((resolve, reject) => {

    const payload = { uid };

    jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: '4h',
    }, (err, token) => {

      if (err) {
        console.log(err)
        reject('impossible to generate token')
      } else {
        resolve(token)
      }
    })
  })
}


module.exports = {
  generaterJWT
}