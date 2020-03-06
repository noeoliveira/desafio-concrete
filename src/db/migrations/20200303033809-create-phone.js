module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("phones", {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
			ddd: {
				type: Sequelize.STRING(3),
				allowNull: false,
				validate: { notEmpty: true }
			},
			number: {
				type: Sequelize.STRING(11),
				allowNull: false,
				validate: { notEmpty: true }
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable("phones");
	}
};
