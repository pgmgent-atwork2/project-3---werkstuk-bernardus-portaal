
import dotenv from "dotenv";

dotenv.config();
import { DataSource } from "typeorm";


const DS = new DataSource({
   type: process.env.DATABASE_TYPE,
   database: process.env.DATABASE_NAME,
   synchronize: true,
});

export default DS;