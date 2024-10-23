import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Member from '../sequelize/models/member.model.js';

dotenv.config();
const memberRouter = express.Router();

// retrieve all members
memberRouter.get('/', async (req, res) => {
  try {
    const members = await Member.findAll();
    res.status(200).json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

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

// enter profile page
memberRouter.get('/profile', verifyToken, async (req, res) => {
  try {
    const member = await Member.findByPk(req.payload.id);
    res.status(200).json({ message: 'Profile Page', member });
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: 'Access Forbidden' });
  }
});

// update a specific member
memberRouter.put('/profile', verifyToken, async (req, res) => {
  const id = req.payload.id;
  try {
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(400).json({ error: 'Member Not Found' });
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
  const id = req.payload.id;
  try {
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(400).json({ error: 'Member Not Found' });
    }

    await Member.destroy({ where: { id } });
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

export default memberRouter;