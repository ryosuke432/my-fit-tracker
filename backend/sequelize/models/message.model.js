import { Sequelize, DataTypes } from 'sequelize';
import Member from './member.model';
import Channel from './channel.model';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: 'postgres' }
);

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Member.belongsToMany(Channel, { through: Message });
Channel.belongsToMany(Member, { through: Message });

export default Message;
