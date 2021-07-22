const { check } = require('express-validator')
const {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/products')
const { categoryExist, productExist } = require('../helpers/dbValidators')
const validateFields = require('../middlewares/validateFields')
const validateJwt = require('../middlewares/validateJwt')

const router = require('express').Router()

router.post(
	'/',
	[
		validateJwt,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('price', 'El precio es obligatorio').not().isEmpty(),
		check('category', 'No es un id valido').isMongoId(),
		check('category').custom(categoryExist),
		validateFields,
	],
	createProduct
)

router.get('/', getProducts)

router.get(
	'/:id',
	[
		check('id', 'id de categoria invalido').isMongoId(),
		check('id').custom(productExist),
		validateFields,
	],
	getProduct
)

router.put(
	'/:id',
	[
		validateJwt,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('price', 'El precio es obligatorio').not().isEmpty(),
		check('category', 'No es un id valido').isMongoId(),
		check('id').custom(productExist),
		validateFields,
	],
	updateProduct
)

router.delete(
	'/:id',
	[validateJwt, check('id').custom(productExist)],
	deleteProduct
)

module.exports = router
