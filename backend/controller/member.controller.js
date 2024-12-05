import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import Member from '../models/member.model.js';

dotenv.config();

// verify jwt token
export const verifyToken = (req, res, next) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication Failed' });
  }

  jwt.verify(authHeader.split(' ')[1], jwtSecretKey, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.payload = payload;
    next();
  });
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password, bodyWeight } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !password ||
      !bodyWeight
    ) {
      return res.status(400).send({ message: 'Send All Required Fields' });
    }

    const existingEmail = await Member.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email Already Registered' });
    }

    const existingMobile = await Member.findOne({ where: { mobile } });
    if (existingMobile) {
      return res.status(409).json({ message: 'Mobile Already Registered' });
    }

    const id = uuidv4();
    await Member.create({
      id,
      firstName,
      lastName,
      email,
      mobile,
      password,
      bodyWeight,
    });
    res.status(201).json({ message: 'Successfully Registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Enter All Required Fields' });
  }

  try {
    const member = await Member.findOne({ where: { email } });

    if (!member) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    const isValid = await member.comparePassword(password);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    const payload = {
      id: member.id,
      email: member.email,
      isPremium: member.isPremium,
    };
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    // TODO: add expiration later
    const accessToken = jwt.sign(payload, jwtSecretKey, {
      // expiresIn: '1h',
    });

    res.status(200).json({ message: 'Successfully Logged In', accessToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err });
  }
};

export const viewProfile = async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

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

    const updatedInfo = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updatedInfo[key] = req.body[key];
      }
    });

    await Member.update(updatedInfo, { where: { id } });
    res.status(200).json({ message: 'Successfully Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const upgradePlan = async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: 'Member Not Found' });
    }

    const currentPlan = member.dataValues.isPremium;
    if (currentPlan)
      return res.status(400).json({ message: 'Already Premium Plan' });

    await Member.update({ isPremium: true }, { where: { id } });
    res.status(200).json({ message: 'Plan Upgraded Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const downgradePlan = async (req, res) => {
  try {
    const id = req.payload.id;
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: 'Member Not Found' });
    }

    const currentPlan = member.dataValues.isPremium;
    if (!currentPlan)
      return res.status(400).json({ message: 'Already Regular Plan' });

    await Member.update({ isPremium: false }, { where: { id } });
    res.status(200).json({ message: 'Plan Upgraded Successfully' });
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
    res.status(200).json({ message: 'Record Marked as Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
