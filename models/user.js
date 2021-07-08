const { Schema, model } = require('mongoose')

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, 'el nombre es obligatorio'],
	},
	email: {
		type: String,
		required: [true, 'el email es obligatorio'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'el password es obligatorio'],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		// enum: ['ADMIN', 'USER','SALES'],
	},
	state: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
})

//para sobrescribir un metodo tiene que ser function porque usa contexto this
// no vamos a ver ni la version __v ni el password en la response con el json
UserSchema.methods.toJSON = function () {
	const { __v, password, ...user } = this.toObject()
	return user
}

//mongoose le agrega el prural automatiamente a la coleccion por eso se pone en minuscula
module.exports = model('User', UserSchema)
