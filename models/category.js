const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
	name: {
		type: String,
		require: [true, 'El nombre es obligatorio'],
		unique: true,
	},
	state: {
		type: Boolean,
		default: true,
		require: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
})

CategorySchema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject()
	return data
}

module.exports = model('Category', CategorySchema)
