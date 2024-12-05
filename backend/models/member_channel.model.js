import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import Member from './member.model.js';
import Channel from './channel.model.js';

class Member_Channel extends Model {}

Member_Channel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize,
    modelName: 'Member_Channel',
    paranoid: true,
  }
);

// Associations
Member.belongsToMany(Channel, { through: Member_Channel, onDelete: 'CASCADE' });
Channel.belongsToMany(Member, { through: Member_Channel, onDelete: 'CASCADE' });

export default Member_Channel;
