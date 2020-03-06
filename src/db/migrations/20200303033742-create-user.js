const { v4: uuid } = require("uuid");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("users", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: uuid()
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,

				validate: { notEmpty: true }
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true }
			},
			token: Sequelize.STRING,
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Date.now()
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Date.now()
			},
			last_login: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Date.now()
			}
		});
	},

	down: queryInterface => {
		return queryInterface
			.dropTable("phones")
			.then(queryInterface.dropTable("users"));
	}
};
