import DatabaseSeeder from "./DatabaseSeeder.js";
import entities from "../../models/index.js";
import minimist from "minimist";

// new instance of db seeder
const dbSeeder = new DatabaseSeeder(
   process.env.DATABASE_TYPE,
   process.env.DATABASE_NAME,
   entities
);

// run a factory
// 