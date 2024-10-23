import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Member from '../models/member.model.js';
import Workout from '../models/workout.model.js';
import Nutrition from '../models/nutrition.model.js';
import Goal from '../models/goal.model.js';

dotenv.config();

// verify jwt token
export const verifyToken = (req, res, next) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  jwt.verify(authHeader.split(' ')[1], jwtSecretKey, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.payload = payload;
    next();
  });
};

// member profile controller
export const viewProfile = async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ message: 'Member Not Found' });
    }
    res.status(200).json({ message: 'Profile Page', member });
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: 'Access Forbidden' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ message: 'Member Not Found' });
    }

    const { f_name, l_name, email, mobile, password, body_weight, is_premium } =
      req.body;
    let updatedInfo = {};
    if (f_name) {
      updatedInfo.f_name = f_name;
    }
    if (l_name) {
      updatedInfo.l_name = l_name;
    }
    if (email) {
      updatedInfo.email = email;
    }
    if (mobile) {
      updatedInfo.mobile = mobile;
    }
    if (password) {
      updatedInfo.password = password;
    }
    if (body_weight) {
      updatedInfo.body_weight = body_weight;
    }
    if (is_premium) {
      updatedInfo.is_premium = is_premium;
    }

    await Member.update(updatedInfo, { where: { id } });
    res.status(200).json({ message: 'Successfully updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ message: 'Member Not Found' });
    }

    await Member.destroy({ where: { id } });
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

// member-workout controller
export const addWorkout = async (req, res) => {
  try {
    const mid = req.payload.id;
    const { name, duration_min, distance_km } = req.body;
    const workout = await Workout.create({
      name,
      duration_min,
      distance_km,
      MemberId: mid,
    });
    res.status(201).json({ message: 'Successfully registerd', workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewAllWorkout = async (req, res) => {
  try {
    const mid = req.payload.id;
    const workouts = await Workout.findAll({ where: { MemberId: mid } });
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
    res.status(200).json(workout);
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

    const { name, duration_min, distance_km } = req.body;
    let updatedInfo = {};
    if (name) {
      updatedInfo.name = name;
    }
    if (duration_min) {
      updatedInfo.duration_min = duration_min;
    }
    if (distance_km) {
      updatedInfo.distance_km = distance_km;
    }

    await Workout.update(updatedInfo, { where: { id: wid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully updated' });
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
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

// member-nutrition controller
export const addNutrition = async (req, res) => {
  try {
    const mid = req.payload.id;
    const { name, calories, protein, fat, carbohydrates } = req.body;
    const nutrition = await Nutrition.create({
      name,
      calories,
      protein,
      fat,
      carbohydrates,
      MemberId: mid,
    });
    res.status(201).json({ message: 'Successfully registerd', nutrition });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewAllNutrition = async (req, res) => {
  try {
    const mid = req.payload.id;
    const nutrition = await Nutrition.findAll({ where: { MemberId: mid } });
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition Not Found' });
    }
    res.status(200).json(nutrition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewNutrition = async (req, res) => {
  try {
    const mid = req.payload.id;
    const nid = req.params.id;
    const nutrition = await Nutrition.findOne({
      where: { id: nid, MemberId: mid },
    });
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition Not Found' });
    }
    res.status(200).json(nutrition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const updateNutrition = async (req, res) => {
  try {
    const mid = req.payload.id;
    const nid = req.params.id;
    const nutrition = await Nutrition.findOne({
      where: { id: nid, MemberId: mid },
    });
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition Not Found' });
    }

    const { name, calories, protein, fat, carbohydrates } = req.body;
    let updatedInfo = {};
    if (name) {
      updatedInfo.name = name;
    }
    if (calories) {
      updatedInfo.calories = calories;
    }
    if (protein) {
      updatedInfo.protein = protein;
    }
    if (fat) {
      updatedInfo.fat = fat;
    }
    if (carbohydrates) {
      updatedInfo.carbohydrates = carbohydrates;
    }

    await Nutrition.update(updatedInfo, { where: { id: nid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const deleteNutrition = async (req, res) => {
  try {
    const mid = req.payload.id;
    const nid = req.params.id;
    const nutrition = await Nutrition.findOne({
      where: { id: nid, MemberId: mid },
    });

    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition Not Found' });
    }

    await Nutrition.destroy({ where: { id: nid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const addGoal = async (req, res) => {
  try {
    const mid = req.payload.id;
    const { goal_type, weekly_goal, total_duration } = req.body;
    const goal = await Goal.create({
      goal_type,
      weekly_goal,
      total_duration,
      MemberId: mid,
    });
    res.status(201).json({ message: 'Successfully registerd', goal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewAllGoals = async (req, res) => {
  try {
    const mid = req.payload.id;
    const goals = await Goal.findAll({ where: { MemberId: mid } });
    if (!goals) {
      return res.status(404).json({ message: 'Goal Not Found' });
    }
    res.status(200).json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewGoal = async (req, res) => {
  try {
    const mid = req.payload.id;
    const gid = req.params.id;
    const goal = await Goal.findOne({
      where: { id: gid, MemberId: mid },
    });
    if (!goal) {
      return res.status(404).json({ message: 'Goal Not Found' });
    }
    res.status(200).json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const mid = req.payload.id;
    const gid = req.params.id;

    const goal = await Goal.findOne({
      where: { id: gid, MemberId: mid },
    });
    if (!goal) {
      return res.status(404).json({ message: 'Goal Not Found' });
    }

    const { goal_type, weekly_goal, total_duration } = req.body;
    let updatedInfo = {};
    if (goal_type) {
      updatedInfo.goal_type = goal_type;
    }
    if (weekly_goal) {
      updatedInfo.weekly_goal = weekly_goal;
    }
    if (total_duration) {
      updatedInfo.total_duration = total_duration;
    }

    await Goal.update(updatedInfo, { where: { id: gid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const mid = req.payload.id;
    const gid = req.params.id;

    const goal = await Goal.findOne({
      where: { id: gid, MemberId: mid },
    });
    if (!goal) {
      return res.status(404).json({ message: 'Goal Not Found' });
    }

    await Goal.destroy({ where: { id: gid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
