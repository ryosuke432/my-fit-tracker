import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import bcrypt from 'bcrypt';

const Member = sequelize.define(
  'Member',
  {
    f_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    l_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.f_name} ${this.l_name}`;
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    mobile: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [10, 10],
          msg: 'Mobile number must be 10 digits',
        },
        is: {
          args: '^[0-9]{10}$',
          msg: 'Only numbers are allowed',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: {
          args: [8, 20],
          msg: 'Password length must be between 8 and 20',
        },
      },
    },
    body_weight: {
      type: DataTypes.FLOAT,
    },
    is_premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (member) => {
        if (member.password) {
          const saltRounds = 10;
          const hashedPwd = await bcrypt.hash(member.password, saltRounds);
          member.password = hashedPwd;
        }
      },
      beforeUpdate: async (member) => {
        if (member.password) {
          const saltRounds = 10;
          const hashedPwd = await bcrypt.hash(member.password, saltRounds);
          member.password = hashedPwd;
        }
      },
    },
  }
);

Member.prototype.comparePassword = async function (plainPwd) {
  return await bcrypt.compare(plainPwd, this.password);
};

// await Member.sync({ alter: true });

export default Member;
