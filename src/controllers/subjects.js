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
  // console.log(userSubjects);

  res.render('subjects', {
    user: userData,
    subjects: userSubjects,
    title: "Vakken"
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
    relations: ['teacher'],
  });

  console.log('Active subject: ', subjectId, subjectData);

  res.render('subject-detail', {
    user, 
    subject: subjectData,
    title: "{{name}}"
  });
};

export const getSubjectPoints = async (req, res) => {
  res.render('subject-punten', {
    title: "Punten"
  });
};

export const getSubjectDocuments = async (req, res) => {
  res.render('subject-document', {
    title: "Document"
  });
};
