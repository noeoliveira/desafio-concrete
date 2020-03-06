const { Model, DataTypes } = require("sequelize");

class Phone extends Model {
	static init(sequelize) {
		super.init(
			{
				ddd: DataTypes.STRING(3),
				numero: { type: DataTypes.STRING(11), field: "number" }
			},
			{ sequelize }
		);

		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
	}
}

module.exports = Phone;
