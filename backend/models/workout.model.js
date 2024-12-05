import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import WorkoutType from './workouttype.model.js';
import Member from './member.model.js';

class Workout extends Model {}

Workout.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    duration_min: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        isInt: { msg: 'Duration must be a positive number' },
      },
    },
    distance_km: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        isFloat: { msg: 'Distance must be a positive number' },
      },
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        isFloat: {
          msg: 'Calories must be a postive number',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Workout',
    paranoid: true,
  }
);

// Associations
Member.hasMany(Workout, { foreignKey: 'MemberId', onDelete: 'CASCADE' });
Workout.belongsTo(Member, { foreignKey: 'MemberId', onDelete: 'CASCADE' });

WorkoutType.hasMany(Workout, {
  foreignKey: 'WorkoutTypeId',
  onDelete: 'CASCADE',
});
Workout.belongsTo(WorkoutType, {
  foreignKey: 'WorkoutTypeId',
  onDelete: 'CASCADE',
});

export default Workout;
