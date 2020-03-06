const jwt = require("jsonwebtoken");
const { match } = require("path-to-regexp");
const status = require("http-status");
const jwtConfig = require("../config/configAuth");

const User = require("../db/models/User");

const exception = {
	routes: [
		{
			method: "POST",
			recurse: "/singup"
		},
		{
			method: "POST",
			recurse: "/singin"
		}
	],
	compare(method, path) {
		const test = match(path);

		return this.routes.find(
			item => test(item.recurse) && method === item.method
		);
	}
};
module.exports = (req, res, next) => {
	if (exception.compare(req.method, req.url)) {
		return next();
	}

	const { authorization } = req.headers;

	if (!authorization)
		return res.status(status.UNAUTHORIZED).json({ error: "Não autorizado" });

	const parts = authorization.split(" ");

	if (parts.length !== 2) {
		return res
			.status(status.UNAUTHORIZED)
			.json({ error: "Parameters token invalid" });
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme))
		return res
			.status(status.UNAUTHORIZED)
			.json({ error: "Parameters token invalid" });

	jwt.verify(token, jwtConfig.jwtSecret, async (error, decoded) => {
		if (error) {
			return res.json({ error: "Sessão inválida", teste: error });
		}

		const user = await User.findByPk(decoded.id, { raw: true });
		if (!user || user.token !== token) {
			return res.status(status.UNAUTHORIZED).json({ error: "Não autorizado" });
		}

		req.userId = decoded.id;
		req.token = token;
		return next();
	});
	return next();
};
