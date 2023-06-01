/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import DataSource from '../lib/DataSource.js';
import jwt from 'jsonwebtoken';

export const getSubjects = async (req, res) => {
  const { token } = req.cookies;
  const tokenDeco = jwt.decode(token);

  const userRepository = DataSource.getRepository('User');

  const user = req.user;
  const subjectsId = req.params?.id ? req.params?.id : '';
  const userData = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['subjects'],
  });
  const userSubjects = userData.subjects;
  console.log(userSubjects);
  // const subjectsRepository = DataSource.getRepository('Subject');

  // // eslint-disable-next-line prefer-destructuring

  // const subjects = await subjectsRepository.find({
  //   where: {
  //     usersId: user.id,
  //   },
  // });
  // console.log(subjects);
  res.render('subjects', {
    layout: 'subjects',
    user: userData,
    subjects: userSubjects,
  });
};
