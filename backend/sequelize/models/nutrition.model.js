import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './index.js';
import Member from './member.model.js';

const Nutrition = sequelize.define('Nutrition', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
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

Member.hasMany(Nutrition);
Nutrition.belongsTo(Member);

export default Nutrition;
