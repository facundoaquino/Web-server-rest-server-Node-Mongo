const { Router } = require('express')
const { checkk, check } = require('express-validator')
const {
	createCategory,
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categories')
const { categoryExist } = require('../helpers/dbValidators')
const { validateRole } = require('../middlewares/validate-role')
const validateFields = require('../middlewares/validateFields')
const validateJwt = require('../middlewares/validateJwt')

const router = Router()

router.get('/', getCategories)

router.get(
	'/:id',
	[
		check('id', 'id de categoria invalido').isMongoId(),
		check('id').custom(categoryExist),
		validateFields,
	],
	getCategory
)

router.post(
	'/',
	[
		validateJwt,
		check('name', 'el nombre es obligatorio').not().isEmpty(),
		validateFields,
	],
	createCategory
)

router.put(
	'/:id',

	validateJwt,
	check('name', 'el nombre es obligatorio').not().isEmpty(),
	check('id').custom(categoryExist),
	validateFields,

	updateCategory
)

router.delete(
	'/:id',
	[
		validateJwt,
		validateRole,
		check('id', 'no es un id valido').isMongoId(),
		check('id').custom(categoryExist),
		validateFields,
	],
	deleteCategory
)

module.exports = router
