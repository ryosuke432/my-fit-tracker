import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Member from '../models/member.model.js';
import Workout from '../models/workout.model.js';
import Nutrition from '../models/nutrition.model.js';

dotenv.config();
const memberRouter = express.Router();

// retrieve all members
// memberRouter.get('/', async (req, res) => {
//   try {
//     const members = await Member.findAll();
//     res.status(200).json(members);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err });
//   }
// });

// retrieve a specific member by id
// memberRouter.get('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const member = await Member.findByPk(id);

//     if (!member) {
//       return res.status(404).json({ error: 'Member Not Found' });
//     }
//     res.status(200).json(member);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err });
//   }
// });

const verifyToken = (req, res, next) => {
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

// Sole entity
// enter profile page
memberRouter.get('/profile', verifyToken, async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(400).json({ message: 'Member Not Found' });
    }
    res.status(200).json({ message: 'Profile Page', member });
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: 'Access Forbidden' });
  }
});

// update a specific member
memberRouter.put('/profile', verifyToken, async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(400).json({ message: 'Member Not Found' });
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
});

// delete a member by id
memberRouter.delete('/profile', verifyToken, async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(400).json({ message: 'Member Not Found' });
    }

    await Member.destroy({ where: { id } });
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// Entities Interaction

// Workout interaction
// add workout of a specific member
memberRouter.post('/workout', verifyToken, async (req, res) => {
  try {
    const fk = req.payload.id;
    const { name, duration_min, distance_km } = req.body;
    const workout = await Workout.create({
      name,
      duration_min,
      distance_km,
      MemberId: fk,
    });
    res.status(201).json({ message: 'Successfully registerd', workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// retrieve all workouts of a specific member
memberRouter.get('/workout', verifyToken, async (req, res) => {
  try {
    const mid = req.payload.id;
    const workouts = await Workout.findAll({ where: { MemberId: mid } });
    if (!workouts) {
      return res.status(400).json({ message: 'Workout Not Found' });
    }
    res.status(200).json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// retrieve specific workout of a specific member
memberRouter.get('/workout/:id', verifyToken, async (req, res) => {
  try {
    const mid = req.payload.id;
    const wid = req.params.id;
    const workout = await Workout.findOne({
      where: { id: wid, MemberId: mid },
    });
    if (!workout) {
      return res.status(400).json({ message: 'Workout Not Found' });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// edit specific workout of a specific member
memberRouter.put('/workout/:id', verifyToken, async (req, res) => {
  try {
    const mid = req.payload.id;
    const wid = req.params.id;
    const workout = await Workout.findOne({
      where: { id: wid, MemberId: mid },
    });
    if (!workout) {
      return res.status(400).json({ message: 'Workout Not Found' });
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
});

// delete a specific workout of a specific member
memberRouter.delete('/workout/:id', verifyToken, async (req, res) => {
  try {
    const mid = req.payload.id;
    const wid = req.params.id;
    const workout = await Workout.findOne({
      where: { id: wid, MemberId: mid },
    });

    if (!workout) {
      return res.status(400).json({ message: 'Workout Not Found' });
    }

    await Workout.destroy({ where: { id: wid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// Nutrition interaction
// add nutrition of a specific member
memberRouter.post('/nutrition', verifyToken, async (req, res) => {
  try {
    const fk = req.payload.id;
    const { name, calories, protein, fat, carbohydrates } = req.body;
    const nutrition = await Nutrition.create({
      name,
      calories,
      protein,
      fat,
      carbohydrates,
      MemberId: fk,
    });
    res.status(201).json({ message: 'Successfully registerd', nutrition });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// retrieve all nutrition of a specific member
memberRouter.get('/nutrition', verifyToken, async (req, res) => {
  try {
    const mid = req.payload.id;
    const nutrition = await Nutrition.findAll({ where: { MemberId: mid } });
    if (!nutrition) {
      return res.status(400).json({ message: 'Nutrition Not Found' });
    }
    res.status(200).json(nutrition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// retrieve specific nutrition of a specific member
memberRouter.get('/nutrition/:id', verifyToken, async (req, res) => {
  try {
    const mid = req.payload.id;
    const nid = req.params.id;
    const nutrition = await Nutrition.findOne({
      where: { id: nid, MemberId: mid },
    });
    if (!nutrition) {
      return res.status(400).json({ message: 'Nutrition Not Found' });
    }
    res.status(200).json(nutrition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// edit specific nutrition of a specific member
memberRouter.put('/nutrition/:id', verifyToken, async (req, res) => {
  try {
    const mid = req.payload.id;
    const nid = req.params.id;
    const nutrition = await Nutrition.findOne({
      where: { id: nid, MemberId: mid },
    });
    if (!nutrition) {
      return res.status(400).json({ message: 'Nutrition Not Found' });
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
});

// delete specific nutrition of a specific member
memberRouter.delete('/nutrition/:id', verifyToken, async (req, res) => {
  try {
    const mid = req.payload.id;
    const nid = req.params.id;
    const nutrition = await Nutrition.findOne({
      where: { id: nid, MemberId: mid },
    });

    if (!nutrition) {
      return res.status(400).json({ message: 'Nutrition Not Found' });
    }

    await Nutrition.destroy({ where: { id: nid, MemberId: mid } });
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});



export default memberRouter;
