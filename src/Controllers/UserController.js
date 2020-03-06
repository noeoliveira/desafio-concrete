const status = require("http-status");
const jwt = require("jsonwebtoken");

const User = require("../db/models/User");

const cfg = require("../config/configAuth");

class UserControler {
	async singup(req, res) {
		const { body } = req;

		try {
			let user = await User.findOne({ where: { email: body.email } });

			if (user) {
				return res
					.status(status.BAD_REQUEST)
					.json({ error: "E-mail já existente" });
			}
			user = await User.create(body, {
				include: [
					{
						association: User.associations.telefones,
						attributes: ["ddd", "numero"]
					}
				],
				raw: true
			});

			if (user) {
				user.senha = undefined;
				user.password = undefined;
			}

			user.setAttributes({
				token: jwt.sign({ id: user.id }, cfg.jwtSecret, {
					expiresIn: "30m"
				})
			});

			await user.save();

			return res.status(status.CREATED).json(user);
		} catch (error) {
			return res.status(status.BAD_REQUEST).json(error);
		}
	}

	async singin(req, res) {
		const { email, senha } = req.body;
		const user = await User.findOne({
			where: { email },
			include: [
				{
					association: User.associations.telefones,
					attributes: ["ddd", "numero"]
				}
			]
		});

		if (!user) {
			return res
				.status(status.BAD_REQUEST)
				.json({ error: "Usuário e/ou senha inválidos" });
		}

		if (!user.checkPassword(senha)) {
			return res
				.status(status.UNAUTHORIZED)
				.json({ error: "Usuário e/ou senha inválidos" });
		}

		user.setAttributes({
			token: jwt.sign({ id: user.id }, cfg.jwtSecret, {
				expiresIn: "30m"
			})
		});
		await user.save();

		user.password = undefined;

		return res.status(status.OK).json(user);
	}

	async getOne(req, res) {
		const { id } = req.params;
		try {
			const user = await User.findByPk(id, {
				include: [
					{
						association: User.associations.telefones,
						attributes: ["ddd", "numero"]
					}
				]
			});

			return res.status(status.OK).json(user);
		} catch (error) {
			return res.status(status.BAD_REQUEST).json(error);
		}
	}
}

module.exports = new UserControler();
