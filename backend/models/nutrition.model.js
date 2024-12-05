import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import Member from './member.model.js';

class Nutrition extends Model {}

Nutrition.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        isFloat: { msg: 'Calories must be an positive number' },
      },
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        isFloat: { msg: 'Protein must be an positive number' },
      },
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        isFloat: { msg: 'Fat must be an positive number' },
      },
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        isFloat: { msg: 'Carbohydrates must be an positive number' },
      },
    },
  },
  {
    sequelize,
    modelName: 'Nutrition',
    paranoid: true,
  }
);

// Associations
Member.hasMany(Nutrition, { foreignKey: 'MemberId', onDelete: 'CASCADE' });
Nutrition.belongsTo(Member, { foreignKey: 'MemberId', onDelete: 'CASCADE' });

export default Nutrition;
