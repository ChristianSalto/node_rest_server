const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/users');
const { roleValidator, existsEmail, idValidatorUser } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.get('/', userGet);

router.put('/:id', [
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(idValidatorUser),
  check('role').custom(roleValidator),
  validateFields
], userPut);

router.post('/', [
  // Con estos Middlewares de express-validator podemos chequear 
  // lo diferentes campos, la funcion check() almacena los errores 
  // en la request, con lo que podremos recuperarlos en el controlador 
  // y hacer las comprobaciones necesarias.
  check('name', 'The name is obligatory').not().isEmpty(),
  check('password', 'The password must be more than 6 digits').isLength({ min: 6 }),
  check('email', 'The email is not valid').isEmail(),
  check('email').custom(existsEmail),
  // check('role', 'It is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(roleValidator),
  validateFields
], userPost);



router.delete('/:id', [
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(idValidatorUser),
  validateFields
], userDelete);

router.patch('/', userPatch);



module.exports = router;