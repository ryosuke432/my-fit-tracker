import express from 'express';
import Member from '../sequelize/models/member.model.js';

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
memberRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findByPk(id);

    !member
      ? res.status(404).json({ error: 'Member Not Found' })
      : res.status(200).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// update a specific member
memberRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const isExist = await Member.findByPk(id);

    if (!isExist) {
      res.status(400).json({ error: 'Cannot find a member' });
    } else {
      const {
        f_name,
        l_name,
        email,
        mobile,
        password,
        body_weight,
        is_premium,
      } = req.body;
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

      const result = await Member.update(updatedInfo, { where: { id } });

      !result
        ? res.status(500).json({ message: 'Something went wrong' })
        : res.status(200).json({ message: 'Successfully updated' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// delete a member by id
memberRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const isExist = await Member.findByPk(id);

    if (!isExist) {
      res.status(400).json({ error: 'Cannot find a member' });
    } else {
      await Member.destroy({ where: { id } });
      res.status(200).json({ message: 'Successfully deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

export default memberRouter;
