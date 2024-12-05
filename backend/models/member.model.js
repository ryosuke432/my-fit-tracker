import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import bcrypt from 'bcryptjs';

class Member extends Model {
  getFullname() {
    return [this.firstName, this.lastName].join(' ');
  }

  async comparePassword(plainPwd) {
    return await bcrypt.compare(plainPwd, this.password);
  }
}

Member.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[+]?[0-9]{7,15}$/,
          msg: 'Invalid phone number format',
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
    bodyWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    lastActive: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Member',
    paranoid: true,
    hooks: {
      beforeCreate: async (member) => {
        if (member.password) {
          const saltRounds = 10;
          member.password = await bcrypt.hash(member.password, saltRounds);
        }
      },
      beforeUpdate: async (member) => {
        if (member.changed('password')) {
          const saltRounds = 10;
          member.password = await bcrypt.hash(member.password, saltRounds);
        }
      },
    },
  }
);

export default Member;
