const { Product } = require('../models')

const createProduct = async (req, res) => {
	const { name, price, category } = req.body
	// console.log(req.user._id)

	const data = {
		name,
		price,
		category,
		user: req.user._id,
	}
	const product = new Product(data)

	await product.save()

	res.status(200).json({
		msg: 'created',
		product,
	})
}

const getProducts = async (req, res) => {
	const { init = 0, limit = 5 } = req.query

	const query = { avaible: true }

	const [total, products] = await Promise.all([
		Product.countDocuments(query),
		Product.find(query)
			.populate('user', 'name')
			.populate('category', 'name')
			.skip(Number(init))
			.limit(Number(limit)),
	])

	res.status(200).json({
		ok: 'ok',
		total,
		products,
	})
}

const getProduct = async (req, res) => {
	const { id } = req.params

	const product = await Product.findById(id).populate('user', 'name')

	res.status(200).json({
		product,
	})
}

const updateProduct = async (req, res) => {
	const { id } = req.params

	const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

	res.status(200).json({
		product,
	})
}

const deleteProduct = async (req, res) => {
	const { id } = req.params

	const product = await Product.findByIdAndUpdate(
		id,
		{ avaible: false },
		{ new: false }
	)

	res.status(200).json({
		product,
	})
}

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
}
