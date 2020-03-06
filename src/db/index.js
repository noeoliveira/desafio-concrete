const Sequelize = require("sequelize");
const Umzug = require("umzug");
const requireDir = require("require-dir");

const dbConfig = require("../config/configDB");

const models = requireDir("./models", { extensions: [".js"] });

const conection = new Sequelize(dbConfig);
if (process.env.NODE_ENV !== "test") {
	const umzug = new Umzug({
		storage: "sequelize",
		storageOptions: {
			sequelize: conection
		},
		migrations: {
			params: [
				conection.getQueryInterface(), // queryInterface
				conection.constructor // DataTypes
			],
			path: `${__dirname}/migrations`
		}
	});
	(async () => {
		// await umzug.down({ to: 0 });
		await umzug.up();
	})();
}

Object.values(models).forEach(model => {
	// Inicia a conexão do model ao DB
	model.init(conection);
});
Object.values(models).forEach(model => {
	// Realiza as relações do model se existir
	if (model.associate) {
		model.associate(conection.models);
	}
});

module.exports = { conection, Sequelize };
