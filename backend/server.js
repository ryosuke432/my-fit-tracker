import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import memberRouter from './routes/member.routes.js';

// Socket.io
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

// Remove the following imports later
import testRouter from './route.test.js';
import sequelize from './db.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// TODO: For testing. Delete later
app.use('/test', testRouter);

app.use('/api/v1/member', memberRouter);
app.use('/api/v1/auth', authRouter);
app.use('*', (req, res) => res.status(404).json({ error: 'Not Found' }));

httpServer.listen(port, async () => {
  try {
    console.log(`Server listening to port: ${port}`);
    // console.log('Checking database updates...');
    // await sequelize.sync({ alter: true });
    // console.log('Complete updates');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
