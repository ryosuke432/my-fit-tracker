import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class GoalType extends Model {}

GoalType.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Goal type name cannot be empty' },
      },
    },
  },
  {
    sequelize,
    modelName: 'GoalType',
    paranoid: true,
  }
);

export default GoalType;

// seeder
// async function seedGoalTypes() {
//   const types = ['Days', 'Calories', 'Distance', 'Duration'];
//   await Promise.all(
//     types.map((type) => GoalType.findOrCreate({ where: { name: type } }))
//   );
//   console.log('Goal types seeded successfully.');
// }

// seedGoalTypes();
