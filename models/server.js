const express = require('express')
const cors = require('cors');
const { json } = require('express');
class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
        this.usersPath='/api/users'

		// Middlewares
		this.middlewares()

		//rutas de la aplicacion
		this.routes()
	}

	middlewares() {
		// cors
        this.app.use(cors())
        //parsear el body

        this.app.use(express.json())
         

		//tiene prioridad el index html sobre el send del get en la raiz
		this.app.use(express.static('public'))
	}

	routes() {
		this.app.use(this.usersPath,require('./../routes/user'))
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server ready on port ${this.port}`)
		})
	}
}

module.exports = Server
