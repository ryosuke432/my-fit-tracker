import Member from './member.model';
import Channel from './channel.model';

Member.belongsToMany(Channel, { through: Member_Channel });
Channel.belongsToMany(Member, { through: Member_Channel });

export default Member_Channel;