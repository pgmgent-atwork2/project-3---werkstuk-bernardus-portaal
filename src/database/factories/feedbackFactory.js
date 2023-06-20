import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";
import { faker } from "@faker-js/faker";

class FeedbackFactory extends Factory {
  async make() {
    const record = {
      text: faker.lorem.sentence(),
      student: await this.getRandomUserId(3),
      subjects: await this.getRandomSubjectId(),
      teacher: await this.getRandomUserId(2),
    };

    // Insert the record into DataSource
    await this.insert(record);

    return record;
  }

  async getRandomUserId(roleId) {
    const userRepo = DataSource.getRepository("User");
    const users = await userRepo.find({
      where: {
        role: {
          id: roleId
        }
      }
    });
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex].id;
  }

async getRandomSubjectId() {
  const userRepo = DataSource.getRepository("User");
  const teacher = await userRepo.findOne({
    where: { role: { id: 2 } },
    relations: ["subjects"]
  });

  if (teacher && teacher.subjects && teacher.subjects.length > 0) {
    const randomIndex = Math.floor(Math.random() * teacher.subjects.length);
    return teacher.subjects[randomIndex].id;
  } else {
    return null;
  }
}



  async insert(record) {
    const repo = DataSource.getRepository("Feedback");

    // Check if feedback already exists in the database
    let existingRecord = await repo.findOne({ where: { text: record.text } });
    if (existingRecord) return existingRecord;

    // Save the feedback
    const insertedRecord = await repo.save(record);

    return insertedRecord;
  }
}

export default FeedbackFactory;
