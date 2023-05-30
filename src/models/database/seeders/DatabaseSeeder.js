import DataSource from "../../lib/DataSource.js";

// connect to database
export default class DatabaseSeeder {
constructor(type, database, entities) {
// ...
}

async connect() {
   this.connection = await DataSource.initialize();
}

async run(factory, amount = 1) {
   // ...
}
}
