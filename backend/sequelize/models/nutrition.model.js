import { Sequelize, DataTypes } from 'sequelize';
import Member from './member.model';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: 'postgres' }
);

const Nutrition = sequelize.define('Nutrition', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calories: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  protein: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  carbohydrates: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Member.hasMany(Nutrition, {
  foreignKey: 'id',
});
Nutrition.belongsTo(Member);

export default Nutrition;