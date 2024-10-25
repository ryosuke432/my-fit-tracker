import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Member from '../models/member.model.js';

dotenv.config();
const authRouter = express.Router();

// register a new member
authRouter.post('/signup', async (req, res) => {
  try {
    if (
      !req.body.f_name ||
      !req.body.l_name ||
      !req.body.email ||
      !req.body.mobile ||
      !req.body.password
    ) {
      return res.status(400).send({ message: 'Send all required fields' });
    }
    const document = req.body;
    await Member.sync({ alter: true });
    await Member.create(document);
    res.status(201).json({ message: 'Successfully registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// login verification
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Enter all the required fields' });
  }

  try {
    const member = await Member.findOne({ where: { email } });

    if (!member) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }

    const isValid = await member.comparePassword(password);

    if (!isValid) {
      return res.status(400).json({ message: 'Please enter a valid password' });
    }

    const payload = {
      id: member.id,
      email: member.email,
    };
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const accessToken = jwt.sign(payload, jwtSecretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Successfully logged in', accessToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err });
  }
});

export default authRouter;
