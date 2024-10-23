import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import Member from './member.model.js';

const Goal = sequelize.define('Goal', {
  goal_type: {
    type: DataTypes.ENUM(
      'Number of workout days',
      'Calories Burned',
      'Workout duration',
      'Workout distance'
    ),
    allowNull: false,
  },
  weekly_goal: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  total_duration: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

Member.hasMany(Goal);
Goal.belongsTo(Member);

Goal.sync({ alter: true });

export default Goal;
