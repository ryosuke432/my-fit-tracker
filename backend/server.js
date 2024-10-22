import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import memberRouter from './routes/member.routes.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.use('/api/v1/member', memberRouter);
app.use('/api/v1/auth', authRouter);
app.use('*', (req, res) => res.status(404).json({ error: 'Not Found' }));

app.listen(port, async () => {
  try {
    console.log(`Server listening to port: ${port}`);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
