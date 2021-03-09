
const express = require('express')

class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT

        // Middlewares
        this.middlewares()

        //rutas de la aplicacion
		this.routes()
	}

    middlewares(){
        //tiene prioridad el index html sobre el send del get en la raiz
        this.app.use( express.static('public'))
    }

	routes() {
		this.app.get('/api', (req, res) => {
			res.json('Hello world')
		})
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server ready on port ${this.port}`)
		})
	}
}

module.exports = Server
