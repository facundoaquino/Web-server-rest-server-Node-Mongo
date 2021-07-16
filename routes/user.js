const { Router } = require('express')
const { check } = require('express-validator')
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/userController')
const { isRoleValid, emailExist, existUserById } = require('../helpers/dbValidators')
const { validateRole, hasRole } = require('../middlewares/validate-role')
const validateFields = require('../middlewares/validateFields')
const validateJwt = require('../middlewares/validateJwt')

const router = Router()

router.get('/', usersGet)

router.put(
	'/:userId',
	[
		// el check del validator puede leer el parametro de la ruta
		check('userId', 'No es un Id valido').isMongoId(),
		check('userId').custom(existUserById),
		check('role').custom(isRoleValid),
		validateFields,
	],
	usersPut
)
router.post(
	'/',
	[
		check('email', 'El correo no es valid').isEmail(),
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password tiene que tener mas de 6 caracteres').isLength({ min: 6 }),
		// check('role', 'No es un rol permitido').isIn('ADMIN', 'USER'),
		//aca personalizamos los roles dinamicamente con los que se encuentran personalizados en la base de datos
		//con el throw new error devolvemos el error
		check('role').custom(isRoleValid),
		check('email').custom(emailExist),
		validateFields,
	],
	usersPost
)
router.delete(
	'/:userId',
	validateJwt,
	// validateRole,
	hasRole('ADMIN'),
	[(check('userId', 'No es un Id valido').isMongoId(), check('userId').custom(existUserById))],
	validateFields,
	usersDelete
)

module.exports = router
