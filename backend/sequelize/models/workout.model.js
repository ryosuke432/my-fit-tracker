import { Sequelize, DataTypes } from 'sequelize';
import Member from './member.model';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: 'postgres' }
);

const Workout = sequelize.define('Workout', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  detail: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Member.hasMany(Workout, {
  foreignKey: 'id',
});
Workout.belongsTo(Member);

export default Workout;
