const { request, response } = require('express')

const { Category } = require('../models')
const category = require('../models/category')

const createCategory = async (req = request, res = response) => {
	const name = req.body.name.toUpperCase()

	const categoryDb = await Category.findOne({ name })

	if (categoryDb) {
		return res.status(400).json({
			msg: 'La categoria ya existe',
		})
	}

	const data = {
		name,
		user: req.user._id,
	}

	const category = new Category(data)
	await category.save()

	res.status(201).json({
		category,
	})
}

const getCategories = async (req, res) => {
	const { limit = 5, init = 0 } = req.query

	const query = { state: true }

	const [total, categories] = await Promise.all([
		Category.countDocuments(query),
		category
			.find(query)
			.populate('user', 'name')
			.skip(Number(init))
			.limit(Number(limit)),
	])

	res.json({
		total,
		categories,
	})
}

const getCategory = async (req, res) => {
	const { id } = req.params

	const category = await (
		await Category.findById(id)
	).populate('user', 'name')

	res.json(category)
}

const updateCategory = async (req, res) => {
	const { id } = req.params

	const { state, user, ...data } = req.body

	data.name = data.name.toUpperCase()
	data.user = req.user._id

	const category = await Category.findByIdAndUpdate(id, data, { new: true })

	res.status(200).json({
		category,
	})
}

const deleteCategory = async (req, res) => {
	const { id } = req.params

	const deleted = await Category.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	)

	res.status(200).json({ msg: 'delete', deleted })
}

module.exports = {
	createCategory,
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
}
