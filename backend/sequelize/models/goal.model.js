import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './index.js';
import Member from './member.model.js';

const Goal = sequelize.define('Goal', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  goal_type: {
    type: DataTypes.ENUM(
      'Workout days',
      'Calories burned',
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

export default Goal;
