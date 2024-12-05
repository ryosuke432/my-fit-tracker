import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import Member from './member.model.js';
import Channel from './channel.model.js';

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('sent', 'delivered', 'read'),
      defaultValue: 'sent',
    },
  },
  {
    sequelize,
    modelName: 'Message',
    paranoid: true,
    hooks: {
      beforeCreate: (message) => {
        message.content = message.content.trim();
      },
    },
  }
);

// Associations
Message.belongsTo(Member, { foreignKey: 'MemberId', onDelete: 'CASCADE' });
Message.belongsTo(Channel, { foreignKey: 'ChannelId', onDelete: 'CASCADE' });

export default Message;
