const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req) // Extrae los errores de validación de una solicitud y los pone a disposición en un objeto.
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next() // Si todo va bien y no hay errores continuara con el siguiente middleware
}


module.exports = {
  validateFields
}