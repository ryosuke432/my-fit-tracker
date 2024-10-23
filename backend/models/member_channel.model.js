import Member from './member.model.js';
import Channel from './channel.model.js';

Member.belongsToMany(Channel, { through: Member_Channel });
Channel.belongsToMany(Member, { through: Member_Channel });

export default Member_Channel;