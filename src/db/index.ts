import { Sequelize } from 'sequelize';

const config = require('../config/db');

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

sequelize.authenticate();
