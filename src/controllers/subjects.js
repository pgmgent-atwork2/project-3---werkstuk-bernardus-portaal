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

  const userData = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['subjects','role', 'subjects.teacher'],
  });

  

  const userSubjects = userData.subjects;
  console.log(userSubjects);

  res.render('subjects', {
    user: userData,
    subjects: userSubjects,
  });
};

export const getSubjectDetails = async (req, res) => {
    const { token } = req.cookies;
  const tokenDeco = jwt.decode(token);

  const userRepository = DataSource.getRepository('User');

  const user = req.user;

  const subjectRepository = DataSource.getRepository('Subject');

  const subjectId = req.params.id;
  const subjectData = await subjectRepository.findOne({
    where: {
      id: subjectId,
    },
  });

  res.render('subject-detail', {
    user, 
    subject: subjectData,
  });
};

export const getSubjectPoints = async (req, res) => {
const userRepository = DataSource.getRepository('Points');

const userRole = req.user?.role?.label;
const user = req.user;

const pointId = req.params.id;

const pointsData = await userRepository.findOne({
    where: {
    id: pointId,
    },
});

const detailPoints = pointsData.points;

  res.render('rapport', {
    user,
    points: detailPoints,
  });
};
