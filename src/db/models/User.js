const { Model, DataTypes } = require("sequelize");
const { hashSync, compareSync } = require("bcryptjs");

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				nome: { type: DataTypes.STRING, field: "name" },
				password: DataTypes.STRING,
				senha: DataTypes.VIRTUAL,
				email: {
					type: DataTypes.STRING,

					validate: { isEmail: true }
				},
				token: DataTypes.STRING,
				data_criacao: {
					type: DataTypes.DATE,
					field: "created_at"
				},
				data_atualizacao: {
					type: DataTypes.DATE,
					field: "updated_at"
				},
				ultimo_login: {
					type: DataTypes.DATE,
					field: "last_login"
				}
			},
			{
				sequelize,
				timestamps: false
			}
		);

		this.addHook("beforeUpdate", user => {
			const changed = user.changed();

			const existToken =
				typeof changed.includes === "function" && changed.includes("token");

			if (existToken) {
				user.ultimo_login = Date.now();
			}
		});

		this.addHook("beforeSave", user => {
			if (user.senha) {
				user.password = hashSync(user.senha, 10);
			}
		});

		return this;
	}

	static associate(models) {
		this.hasMany(models.Phone, { foreignKey: "user_id", as: "telefones" });
	}

	checkPassword(password) {
		return compareSync(password, this.password);
	}
}

module.exports = User;
