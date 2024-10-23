import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import Member from './member.model.js';

const Nutrition = sequelize.define('Nutrition', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calories: {
    type: DataTypes.FLOAT,
  },
  protein: {
    type: DataTypes.FLOAT,
  },
  fat: {
    type: DataTypes.FLOAT,
  },
  carbohydrates: {
    type: DataTypes.FLOAT,
  },
});

Member.hasMany(Nutrition, {
  foreignKey: 'id',
});
Nutrition.belongsTo(Member);

export default Nutrition;