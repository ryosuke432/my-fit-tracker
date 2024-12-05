import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import Member from './member.model.js';
import GoalType from './goalType.model.js';

class Goal extends Model {}

Goal.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    weekly_goal: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 0,
        isInt: { msg: 'Weekly goal must be a positive number' },
      },
    },
    total_duration: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 0,
        isInt: { msg: 'Weekly goal must be a positive number' },
      },
    },
  },
  {
    sequelize,
    modelName: 'Goal',
    paranoid: true,
  }
);

// Associations
Member.hasMany(Goal, { foreignKey: 'MemberId', onDelete: 'CASCADE' });
Goal.belongsTo(Member, { foreignKey: 'MemberId', onDelete: 'CASCADE' });

GoalType.hasMany(Goal, { foreignKey: 'GoalTypeId', onDelete: 'CASCADE' });
Goal.belongsTo(GoalType, { foreignKey: 'GoalTypeId', onDelete: 'CASCADE' });

export default Goal;
