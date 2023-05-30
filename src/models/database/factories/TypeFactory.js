	
import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

class TypeFactory extends Factory {
constructor() {
      super();
      this.types = [];
   }
   async make() {
   }
   async makeMany() {
   }
   async insert(name, randType) {  }
}

export default new TypeFactory();
