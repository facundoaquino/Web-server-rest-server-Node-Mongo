const { response } = require('express')

const usersGet = (req, res = response) => {
	res.status(200).json({
		msg: 'get api',
	})
}

const usersPost = (req, res) => {
	res.status(201).json({
		msg: 'post api',
	})
}

const usersPut = (req, res) => {
	res.status(200).json({
		msg: 'put api',
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
