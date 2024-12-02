import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './index.js';
import Member from './member.model.js';

const Workout = sequelize.define('Workout', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.ENUM('Walking', 'Running', 'Cycling', 'Swimming'),
    allowNull: false,
  },
  duration_min: {
    type: DataTypes.INTEGER,
  },
  distance_km: {
    type: DataTypes.FLOAT,
  },
  calories: {
    type: DataTypes.FLOAT,
  },
});

Member.hasMany(Workout);
Workout.belongsTo(Member);

export default Workout;
