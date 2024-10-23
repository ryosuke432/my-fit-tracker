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

Member.hasMany(Goal, {
  foreignKey: 'id',
});
Goal.belongsTo(Member);

export default Goal;
