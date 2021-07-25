const { response, request } = require('express')
const { uploadFile } = require('../helpers/uploadFile')
const { User, Product } = require('../models')
const fs = require('fs')
const path = require('path')
const router = require('../routes/uploads')
const loadFile = async (req = request, res = response) => {
	try {
		const fileName = await uploadFile(req.files, undefined, 'images')

		res.status(200).json({
			name: fileName,
		})
	} catch (msg) {
		console.log(msg)
		res.status(400).json({ msg })
	}
}

const updateFileColection = async (req = request, res = response) => {
	const { id, colection } = req.params

	let model

	switch (colection) {
		case 'users':
			model = await User.findById(id)
			if (!model) {
				return res.status(400).json({
					msg: 'no existe usuario',
				})
			}

			break
		case 'products':
			model = await Product.findById(id)
			if (!model) {
				return res.status(400).json({
					msg: 'no existe producto',
				})
			}

			break

		default:
			res.status(500).json({
				msg: 'invalid colection',
			})
			break
	}

	// limpiar imagen si ya existe

	if (model.img) {
		const pathImg = path.join(
			__dirname,
			'../uploads',
			colection,
			model.img
		)
		if (fs.existsSync(pathImg)) {
			fs.unlinkSync(pathImg)
		}
	}

	const fileName = await uploadFile(req.files, undefined, colection)
	model.img = fileName

	await model.save()

	res.json(model)
}

const getImgColection = async(req,res)=>{

	const {id , colection } = req.params

	let model

	switch (colection) {
		case 'users':
			model = await User.findById(id)
			if (!model) {
				return res.status(400).json({
					msg: 'no existe usuario',
				})
			}

			break
		case 'products':
			model = await Product.findById(id)
			if (!model) {
				return res.status(400).json({
					msg: 'no existe producto',
				})
			}

			break

		default:
			res.status(500).json({
				msg: 'invalid colection',
			})
			break
	}


	if (model.img) {
		const pathImg = path.join(
			__dirname,
			'../uploads',
			colection,
			model.img
		)
		if (fs.existsSync(pathImg)) {
			return res.sendFile(pathImg)
		}
	}

	const pathNoImg = path.join(__dirname,'../assets','no-image.jpg')
 
	res.sendFile(pathNoImg)
}


module.exports = { loadFile, updateFileColection ,getImgColection}
