import express from 'express';
import { Op } from 'sequelize';
import Member from '../sequelize/models/member.model.js';

const authRouter = express.Router();

// TODO: implement jwt auth
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
// app.get('/login', (req, res) => {
//   const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   const jwtSecretKey = process.env.JWT_SECRET_KEY;

//   try {
//     const token = req.header(tokenHeaderKey);

//     const verified = jwt.verify(token, jwtSecretKey);
//     if (verified) {
//       return res.send('Successfully Verified!');
//     } else {
//       return res.status(401).send(error);
//     }
//   } catch (err) {
//     return res.status(401).send(err);
//   }
// });

export default authRouter;
