import DataSource from "../../lib/DataSource.js";

export default class DatabaseSeeder {
  constructor(type, database, entities) {
    this.type = type;
    this.database = database;
    this.entities = entities;
    this.connection = null;
  }

  async connect() {
    this.connection =  await DataSource.initialize();
  }

  async run(factory, amount = 2) {
    // Connect to the database
    await this.connect();

    if (amount > 1) {
      await factory.makeMany(amount);
    } else {
      await factory.make();
    }

    return factory.inserted;
  }
}
