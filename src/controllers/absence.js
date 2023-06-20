/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';
import jwt from 'jsonwebtoken';

export const getAbsence = async (req, res) => {
  const { token } = req.cookies;
  const tokenDeco = jwt.decode(token);

  const userRepository = DataSource.getRepository('User');

  const user = req.user;

  const userData = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['subjects', 'role', 'subjects.teacher'],
  });

  const userSubjects = userData.subjects;
  
  res.render('absence', {
    user: userData,
    title: 'Afwezigheden',
  });
};
