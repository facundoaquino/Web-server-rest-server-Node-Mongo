const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')
class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
		this.usersPath = '/api/users'
		this.authPath = '/api/auth'
		this.paths = {
			auth: '/api/auth',
			user: '/api/users',
			categories: '/api/categories',
			products: '/api/products',
			search: '/api/search',
			uploads: '/api/uploads',
		}

		//Conectar a la base de datos
		this.connectDb()

		// Middlewares
		this.middlewares()

		//rutas de la aplicacion
		this.routes()
	}

	async connectDb() {
		await dbConnection()
	}

	middlewares() {
		// cors
		this.app.use(cors())
		//parsear el body

		this.app.use(express.json())

		// fileupload , carga de archivos con libreria express-upload

		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				// cuando ejecutamos la funcion mv para guardar el archivo en un directorio con esta opcion crea la carpeta si no existe (createParentPath)
				createParentPath: true,
			})
		)

		//tiene prioridad el index html sobre el send del get en la raiz
		this.app.use(express.static('public'))
	}

	routes() {
		this.app.use(this.paths.user, require('./../routes/user'))
		this.app.use(this.paths.auth, require('./../routes/auth'))
		this.app.use(this.paths.categories, require('./../routes/categories'))
		this.app.use(this.paths.products, require('../routes/products'))
		this.app.use(this.paths.search, require('../routes/search'))
		this.app.use(this.paths.uploads, require('../routes/uploads'))
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server ready on port ${this.port}`)
		})
	}
}

module.exports = Server
