import { Sequelize, DataTypes } from 'sequelize';
import Member from './member.model';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: 'postgres' }
);

const Goal = sequelize.define('Goal', {
  type: {
    type: DataTypes.ENUM('Number of workout days', 'Calories Burned', 'Workout duration', 'Workout distance'),
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