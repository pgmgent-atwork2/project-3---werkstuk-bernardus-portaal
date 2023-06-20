/* eslint-disable prettier/prettier */
import "dotenv/config";
import minimist from "minimist";
import DatabaseSeeder from "./DatabaseSeeder.js";
import entities from "../../models/index.js";
import FeedbackFactory from "../../database/factories/FeedbackFactory.js";
import PointFactory from "../../database/factories/pointFactory.js";

const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_URL,
  entities
);

const { factory, amount = 50 } = minimist(process.argv.slice(2));

const logResponse = (records) => {
  console.log(`${records.length} records inserted.`);
  console.log("Inserted records:", records);
};

switch (factory) {
  case "feedback":
    dbSeeder.run(new FeedbackFactory(), amount).then(logResponse);
    break;
  case "point":
    dbSeeder.run(new PointFactory(), amount).then(logResponse);
    break;
  default:
    console.log("Invalid factory.");
}
