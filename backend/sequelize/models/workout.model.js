import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import Member from './member.model.js';

const Workout = sequelize.define('Workout', {
  name: {
    type: DataTypes.ENUM(
      'Walking',
      'Running',
      'Cycling',
      'Swimming',
      'Other'
    ),
    allowNull: false,
  },
  duration_min: {
    type: DataTypes.INTEGER
  },
  distance_km: {
    type: DataTypes.INTEGER
  },
  detail: {
    type: DataTypes.TEXT,
  },
});

Member.hasMany(Workout, {
  foreignKey: 'id',
});
Workout.belongsTo(Member);

export default Workout;
