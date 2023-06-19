export default class Factory {
  constructor() {
    this.inserted = [];
  }

  async make() {
    throw new Error("Factory should contain a make method");
  }

  async makeMany(amount) {
    for (let i = 0; i < amount; i++) {
      const record = await this.make();
      this.inserted.push(record);
    }
  }
}
