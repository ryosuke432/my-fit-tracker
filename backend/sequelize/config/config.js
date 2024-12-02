import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres',
  },
  test: {
    url: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres',
  },
};

export default config;
