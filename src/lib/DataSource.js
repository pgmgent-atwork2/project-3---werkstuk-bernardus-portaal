import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

import entities from '../models/index.js';


const DS = new DataSource({
   type: process.env.DATABASE_TYPE,
   database: process.env.DATABASE_NAME,
   synchronize: true,
   entities
});

export default DS;