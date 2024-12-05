import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Channel extends Model {}

Channel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('private', 'group'),
      defaultValue: 'private',
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Channel',
    paranoid: true,
    hooks: {
      beforeValidate: (channel) => {
        if (!channel.slug) {
          channel.slug = channel.name.toLowerCase().replace(/\s+/g, '-');
        }
      },
    },
  }
);

export default Channel;
