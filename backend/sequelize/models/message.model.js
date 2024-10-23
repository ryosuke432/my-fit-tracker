import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import Member from './member.model.js';
import Channel from './channel.model.js';

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Member.belongsToMany(Channel, { through: Message });
Channel.belongsToMany(Member, { through: Message });

Message.sync({ alter: true });

export default Message;
