import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Member from './member.model.js';

const Workout = sequelize.define('Workout', {
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
  }
});

Member.hasMany(Workout);
Workout.belongsTo(Member);

await Workout.sync({ alter: true });

export default Workout;
