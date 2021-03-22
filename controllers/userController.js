// para tener el tipado
const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { validationResult } = require('express-validator')

const usersGet = (req = request, res = response) => {
	const query = req.query

	res.status(200).json({
		msg: 'get api',
		query,
	})
}
const usersPost = async (req, res) => {


	const { name, email, password, role } = req.body
	const user = new User({ name, email, password, role })

	const emailExist = await User.findOne({ email })
	if (emailExist) {
		return res.status(400).json({ msg: 'El correo ya se encuentra registrado' })
	}

	const salt = bcrypt.genSaltSync()
	user.password = bcrypt.hashSync(password, salt)

	await user.save()
	res.status(201).json({
		msg: 'post api',
		user,
	})
}

const usersPut = (req, res) => {
	res.status(200).json({
		msg: 'put api',
		userid: req.params.userId,
	})
}

const usersDelete = (req, res) => {
	res.status(200).json({
		msg: 'delete api',
	})
}

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersDelete,
}
