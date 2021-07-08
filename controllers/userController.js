// para tener el tipado
const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const usersGet = async (req = request, res = response) => {
	const { limit = 5, init = 0 } = req.query

	const [total, users] = await Promise.all([
		User.countDocuments({ state: true }),
		User.find({ state: true }).skip(Number(init)).limit(Number(limit)),
	])
	res.status(200).json({
		total,
		users,
	})
}
const usersPost = async (req, res) => {
	const { name, email, password, role } = req.body
	const user = new User({ name, email, password, role })

	// const emailExist = await User.findOne({ email })
	// if (emailExist) {
	// 	return res.status(400).json({ msg: 'El correo ya se encuentra registrado' })
	// }
	// con el salt indicamos el nivel de encriptacion mas alto el nivel mas tarda en en/desencriptar
	const salt = bcrypt.genSaltSync()
	user.password = bcrypt.hashSync(password, salt)

	await user.save()
	res.status(201).json({
		msg: 'post api',
		user,
	})
}

const usersPut = async (req, res) => {
	const { userId } = req.params

	// console.log(req.body)
	const { password, google, email, ...rest } = req.body
	if (password) {
		const salt = bcrypt.genSaltSync()
		rest.password = bcrypt.hashSync(password, salt)
	}
	const user = await User.findByIdAndUpdate(userId, rest)

	// console.log(user)
	res.status(200).json({
		msg: 'put api',
		user,
	})
}

const usersDelete = async (req, res) => {
	const { userId } = req.params
	// console.log(userId)

	// borrado fisico
	// const user = await User.findOneAndDelete(userId)

	// borrado logico
	const user = await User.findByIdAndUpdate(userId, { state: false })

	res.status(200).json({
		user,
	})
}

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersDelete,
}
