import fs from 'fs';
import { v4 as uuid } from 'uuid';
import DataSource from '../lib/DataSource.js';
import { PUBLIC_PATH } from '../consts.js';

export const subjectAvatar = async (req, res, next) => {
  try {
    const { file, body } = req;

    console.log(file);

    // If no file is sent, skip this middleware
    if (!file) {
      return next();
    }

    const subjectRepository = DataSource.getRepository('Subject');
    const subjectId = body.subjectId;
    const subject = await subjectRepository.findOne({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      console.log('User not found');
      return res.send('User not found');
    }

    // Use the username of the user as part of the filename
    const originalFilename = `${subject.name}`;

    const fileExtension = file.originalname.split('.').pop();
    const newFilename = `${uuid()}.${fileExtension}`;

    const filePath = `${PUBLIC_PATH}/images/${originalFilename}.svg`;

    fs.writeFileSync(filePath, file.buffer);

    console.log(subject);

    return next();
  } catch (error) {
    console.log('Error retrieving user from the database:', error);
    return res.send('Error retrieving user from the database');
  }
};
