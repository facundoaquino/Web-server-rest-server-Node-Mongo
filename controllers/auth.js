const { request, response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/generateJWT')
const login = async (req = request, res = response) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({
				msg: 'usuario o password incorrectos',
			})
		}

		if (!user.state) {
			return res.status(400).json({
				msg: 'usuario o password incorrectos',
			})
		}

		// verificacion de password

		const validPassword = bcrypt.compareSync(password, user.password)

		if (!validPassword) {
			return res.status(400).json({
				msg: 'usuario o password incorrectos',
			})
		}

		const token = await generateJWT(user.id)

		res.json({
			msg: 'login ok',
			user,
			token,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			msg: 'ups algo salio mal',
		})
	}
}

module.exports = {
	login,
}
