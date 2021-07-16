const validateRole = (req, res, next) => {
	if (!req.user) {
		return res.status(500).json({
			msg: 'se quiere verificar el rol sin validar el token primero',
		})
	}

	const { role, name } = req.user

	if (role !== 'ADMIN') {
		return res.status(401).json({
			msg: `${name} no es admin`,
		})
	}

	next()
}

const hasRole = (...roles) => {
	// console.log('la concha de tu madre')
	return (req, res, next) => {
		// console.log(roles)

		if (!roles.includes(req.user.role)) {
			return res.status(401).json({
				msg: 'rol no autorizado',
			})
		}
		next()
	}
}

module.exports = { validateRole, hasRole }
