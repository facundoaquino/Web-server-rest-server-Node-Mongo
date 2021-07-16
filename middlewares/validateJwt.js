const { request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJwt = async (req = request, res, next) => {
	const token = req.header('x-token')

	if (!token) {
		return res.status(401).json({
			msg: 'no hay token en la peticion',
		})
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

		const user = await User.findById(uid)

		if (!user) {
			return res.status(401).json({
				msg: 'usuario no existe en base de datos',
			})
		}

		// verificamos el estado del usuario

		if (!user.state) {
			return res.status(401).json({
				msg: 'usuario con estado desconectado',
			})
		}
		req.user = user

		next()
	} catch (error) {
		// console.log(error)
		return res.status(401).json({
			msg: 'Token no valido u error',
		})
	}
}

module.exports = validateJwt
