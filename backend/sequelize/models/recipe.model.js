import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './index.js';

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
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
  recipe: {
    type: DataTypes.STRING,
  },
});

export default Recipe;
