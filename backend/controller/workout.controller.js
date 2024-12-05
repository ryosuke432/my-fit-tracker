import { v4 as uuidv4 } from 'uuid';
import sequelize from '../db.js';
import Workout from '../models/workout.model.js';
import WorkoutType from '../models/workouttype.model.js';
import Member from '../models/member.model.js';

// Helper function to calculate MET based on activity and speed
const calculateMet = (name, speedKmh) => {
  switch (name) {
    case 'Walking':
      return speedKmh < 3.22 ? 2 : 4.5;
    case 'Running':
      if (speedKmh <= 8.05) return 8;
      if (speedKmh <= 11.27) return 11.5;
      return 16;
    case 'Cycling':
      if (speedKmh <= 16.09) return 4;
      if (speedKmh < 19.31) return 8;
      if (speedKmh < 22.53) return 10;
      return 12;
    case 'Swimming':
      return 7;
    default:
      return 0;
  }
};

export const addWorkout = async (req, res) => {
  try {
    const mid = req.payload.id;
    const { name, duration_min, distance_km } = req.body;
    if (!name)
      return res.status(404).json({ message: 'Send All Required Fields' });

    const workoutType = await WorkoutType.findOne({ where: { name } });
    if (!workoutType)
      return res.status(404).json({ message: 'Invalid workout type' });

    const member = await Member.findByPk(mid);

    const { bodyWeight } = member?.dataValues;
    let calories = 0;

    if (duration_min && distance_km) {
      const speedKmh = distance_km / (duration_min / 60);
      const met = calculateMet(name, speedKmh);
      calories = (duration_min * met * bodyWeight) / 200;
    }

    const workout = await Workout.create({
      id: uuidv4(),
      duration_min,
      distance_km,
      calories,
      MemberId: mid,
      WorkoutTypeId: workoutType.dataValues.id,
    });

    res.status(201).json({ message: 'Successfully Registered', workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewAllWorkout = async (req, res) => {
  try {
    const mid = req.payload.id;
    const { date, week } = req.query;
    let filter = {
      where: { MemberId: mid },
    };
    if (date || week) {
      const attributes = [];
      const group = [];
      if (date) {
        attributes.push([
          sequelize.fn('date', sequelize.col('createdAt')),
          'date',
        ]);
        group.push([sequelize.fn('date', sequelize.col('createdAt'))]);
      }
      if (week) {
        attributes.push([
          sequelize.fn('date_part', 'week', sequelize.col('createdAt')),
          'week',
        ]);
        group.push([
          sequelize.fn('date_part', 'week', sequelize.col('createdAt')),
        ]);
      }

      attributes.push(
        [sequelize.fn('SUM', sequelize.col('duration_min')), 'total_duration'],
        [sequelize.fn('SUM', sequelize.col('distance_km')), 'total_distance'],
        [sequelize.fn('SUM', sequelize.col('calories')), 'total_calories']
      );

      filter.attributes = attributes;
      filter.group = group;
    } else {
      filter.include = 'WorkoutType';
    }

    const workouts = await Workout.findAll(filter);

    if (!workouts) {
      return res.status(404).json({ message: 'Workout Not Found' });
    }
    res.status(200).json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewWorkout = async (req, res) => {
  try {
    const mid = req.payload.id;
    const wid = req.params.id;
    const workout = await Workout.findOne({
      where: { id: wid, MemberId: mid },
    });
    if (!workout) {
      return res.status(404).json({ message: 'Workout Not Found' });
    }

    const workoutType = await WorkoutType.findByPk(
      workout.dataValues.WorkoutTypeId
    );

    res.status(200).json({ Workout: workout, WorkoutType: workoutType.dataValues.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const mid = req.payload.id;
    const wid = req.params.id;
    const workout = await Workout.findOne({
      where: { id: wid, MemberId: mid },
    });
    if (!workout) {
      return res.status(404).json({ message: 'Workout Not Found' });
    }

    const updatedInfo = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updatedInfo[key] = req.body[key];
      }
    });

    await Workout.update(updatedInfo, { where: { id: wid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const mid = req.payload.id;
    const wid = req.params.id;
    const workout = await Workout.findOne({
      where: { id: wid, MemberId: mid },
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout Not Found' });
    }

    await Workout.destroy({ where: { id: wid, MemberId: mid } });
    res.status(200).json({ message: 'Record Marked as Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
