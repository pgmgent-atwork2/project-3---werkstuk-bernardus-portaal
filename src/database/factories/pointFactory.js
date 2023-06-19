import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";
import { faker } from "@faker-js/faker";

class PointFactory extends Factory {
  async make() {
    const pointValue = Math.floor(Math.random() * 20) + 1;
    const record = {
      point: pointValue,
      comment: generateRandomComment(pointValue),
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
    const repo = DataSource.getRepository("Points");

    // Save the point with a new ID
    const insertedRecord = await repo.save(record);

    return insertedRecord;
  }
}

function generateRandomComment(point) {
  if (point < 5) {
    const comments = ["Nog wat oefening nodig!", "Blijf oefenen!", "Je kunt het beter doen!"];
    const randomIndex = Math.floor(Math.random() * comments.length);
    return comments[randomIndex];
  } else if (point < 10) {
    return "Kon beter!";
  } else if (point < 15) {
    return "Goed gedaan!";
  } else {
    return "Perfect!";
  }
}

export default PointFactory;
