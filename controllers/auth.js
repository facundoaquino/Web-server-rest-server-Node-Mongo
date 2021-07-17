const { request, response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/generateJWT')
const { googleVerify } = require('../helpers/google-verify')
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

const googleSignin = async (req, res) => {
	const { id_token } = req.body
	// console.log(id_token)

	try {
		const { name, email, img } = await googleVerify(id_token)

		let user = await User.findOne({ email })
		if (!user) {
			const data = {
				name,
				email,
				password: 'a',
				img,
			}
			user = new User(data)
			await user.save()
		}

		if (!user.state) {
			return res.status(401).json({
				msg: 'usuario bloquedo',
			})
		}

		const token = await generateJWT(user.id)

		res.json({
			user,
			token,
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({ msg: 'token no reconocido' })
	}
}
module.exports = {
	login,
	googleSignin,
}
