// para tener el tipado
const { response,request } = require('express')

const usersGet = (req = request, res = response) => {
    const query = req.query

	res.status(200).json({
		msg: 'get api',
        query
	})
}

const usersPost = (req, res) => {

     
	res.status(201).json({
		msg: 'post api',
        body:req.body
	})
}

const usersPut = (req, res) => {

	res.status(200).json({
		msg: 'put api',
        userid:req.params.userId
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
