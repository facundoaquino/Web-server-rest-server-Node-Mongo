const { Category } = require('../models')

const Role = require('../models/role')
const User = require('../models/user')

const isRoleValid = async (role = '') => {
	const rolExists = await Role.findOne({ role })
	if (!rolExists) {
		throw new Error(`El rol ${role} es incorrecto`)
	}
}

const emailExist = async (email) => {
	const isEmailInDb = await User.findOne({ email })
	if (isEmailInDb) {
		throw new Error(`El email ${email} ya existe `)
	}
}

const existUserById = async (id) => {
	const isUser = await User.findById(id)
	if (!isUser) {
		throw new Error('El id no existe')
	}
}

const categoryExist = async (id) => {
	// console.log(id)
	const exists = await Category.findById(id)

	if (!exists) {
		throw new Error('el id no existe')
	}
}
module.exports = {
	isRoleValid,
	emailExist,
	existUserById,
	categoryExist,
}
