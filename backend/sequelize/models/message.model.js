import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './index.js';
import Member from './member.model.js';
import Channel from './channel.model.js';

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Member,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: true, // Allow null if it's a channel-wide message
    references: {
      model: Member,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  ChannelId: {
    type: DataTypes.UUID,
    allowNull: true, // Allow null for private messages
    references: {
      model: Channel,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
});

Member.hasMany(Message, { foreignKey: 'senderId', as: 'SentMessages' });
Member.hasMany(Message, { foreignKey: 'receiverId', as: 'ReceivedMessages' });
Channel.hasMany(Message, { foreignKey: 'ChannelId' });
Message.belongsTo(Member, { foreignKey: 'senderId', as: 'Sender' });
Message.belongsTo(Member, { foreignKey: 'receiverId', as: 'Receiver' });
Message.belongsTo(Channel, { foreignKey: 'ChannelId' });

export default Message;
