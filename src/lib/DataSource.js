import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import entities from '../models/index.js';

// const entities = [Role, User];

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: entities,
});

export default DS;
