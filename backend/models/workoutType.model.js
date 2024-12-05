import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class WorkoutType extends Model {}

WorkoutType.init(
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
        notEmpty: { msg: 'Workout type name cannot be empty' },
      },
    },
  },
  {
    sequelize,
    modelName: 'WorkoutType',
    paranoid: true,
  }
);

export default WorkoutType;

// seeder
// async function seedWorkoutTypes() {
//   const types = ['Walking', 'Running', 'Cycling', 'Swimming'];
//   await Promise.all(
//     types.map((type) => WorkoutType.findOrCreate({ where: { name: type } }))
//   );
//   console.log('Workout types seeded successfully.');
// }

// seedWorkoutTypes();
