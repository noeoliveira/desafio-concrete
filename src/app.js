require("dotenv").config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
require("./db");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const auth = require("./Middleware/auth");

const routes = require("./routes");

class App {
	constructor() {
		this.express = express();

		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.express.use(express.json());
		this.express.use(express.urlencoded({ extended: false }));
		this.express.use(cors());
		this.express.use(helmet());
		this.express.use(compression());
		this.express.use(auth);
	}

	routes() {
		this.express.use(routes);
	}
}

module.exports = new App().express;
