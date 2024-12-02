import sequelize from './index.js';
import Member from './member.model.js';
import Channel from './channel.model.js';

const Member_Channel = sequelize.define('Member_Channel', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

Member.belongsToMany(Channel, { through: Member_Channel });
Channel.belongsToMany(Member, { through: Member_Channel });

export default Member_Channel;
