import { v4 as uuidv4 } from 'uuid';
import sequelize from '../db.js';
import Nutrition from '../models/nutrition.model.js';

export const addNutrition = async (req, res) => {
  try {
    const mid = req.payload.id;
    const { name, calories, protein, fat, carbohydrates } = req.body;
    if (!name)
      return res.status(400).json({ message: 'Send All Required fields' });

    const id = uuidv4();
    const nutrition = await Nutrition.create({
      id,
      name,
      calories,
      protein,
      fat,
      carbohydrates,
      MemberId: mid,
    });
    res.status(201).json({ message: 'Successfully Registerd', nutrition });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const viewAllNutrition = async (req, res) => {
  try {
    const mid = req.payload.id;
    const { date, week } = req.query;

    let filter = { where: { MemberId: mid } };

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
        [sequelize.fn('SUM', sequelize.col('calories')), 'total_calories'],
        [sequelize.fn('SUM', sequelize.col('protein')), 'total_protein'],
        [sequelize.fn('SUM', sequelize.col('fat')), 'total_fat'],
        [
          sequelize.fn('SUM', sequelize.col('carbohydrates')),
          'total_carbohydrates',
        ]
      );

      filter.attributes = attributes;
      filter.group = group;
    }
    const nutrition = await Nutrition.findAll(filter);

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

    const updatedInfo = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updatedInfo[key] = req.body[key];
      }
    });

    await Nutrition.update(updatedInfo, { where: { id: nid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully Updated' });
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
    res.status(200).json({ message: 'Record Marked as Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
