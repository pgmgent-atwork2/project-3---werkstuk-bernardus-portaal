/* eslint-disable prettier/prettier */
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

  res.render('subjects', {
    layout: 'subjects',
    user: userData,
    subjects: userSubjects,
  });
};

export const getSubjectDetails = async (req, res) => {
  const subjectRepository = DataSource.getRepository('Subject');

  const subjectId = req.params.id;
  const subjectData = await subjectRepository.findOne({
    where: {
      id: subjectId,
    },
  });

  res.render('subject-detail', {
    layout: 'subjects',
    subject: subjectData,
  });
};