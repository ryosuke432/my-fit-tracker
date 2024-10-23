import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Channel = sequelize.define('Channel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Channel;