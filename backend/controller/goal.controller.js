import { v4 as uuidv4 } from 'uuid';
import Goal from '../models/goal.model.js';
import GoalType from '../models/goalType.model.js';

export const addGoal = async (req, res) => {
  try {
    const mid = req.payload.id;
    const { name, weekly_goal, total_duration } = req.body;
    if (!name || !weekly_goal || !total_duration)
      return res.status(400).json({ message: 'Send All Required Fields' });

    const goalType = await GoalType.findOne({ where: { name } });
    if (!goalType)
      return res.status(404).json({ message: 'Invalid Goal Type' });

    const id = uuidv4();
    const [goal, created] = await Goal.findOrCreate({
      where: {
        GoalTypeId: goalType.dataValues.id,
        MemberId: mid,
      },
      defaults: {
        id,
        weekly_goal,
        total_duration,
      },
    });
    res.status(201).json({ message: 'Successfully Registerd', goal, created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewAllGoals = async (req, res) => {
  try {
    const mid = req.payload.id;
    const goals = await Goal.findAll({
      where: { MemberId: mid },
      include: GoalType,
    });
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

    const goalType = await GoalType.findByPk(goal.dataValues.GoalTypeId);

    res.status(200).json({ Goal: goal, GoalType: goalType.dataValues.name });
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
    res.status(200).json({ message: 'Successfully Updated' });
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
    res.status(200).json({ message: 'Record Marked as Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
