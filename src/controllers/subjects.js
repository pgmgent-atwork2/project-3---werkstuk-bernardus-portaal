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
  });
};

export const getSubjectPoints = async (req, res) => {
  res.render('subject-punten', {
  });
};

export const getSubjectDocuments = async (req, res) => {
  res.render('subject-document', {
  });
};

export const getSubjectRapport = async (req, res) => {
  res.render('subject-rapport', {
  });
};

export const getSubjectRapportLink = async (req, res) => {
  res.render('subject-rapport-link', {
  });
};


export const getSubjectAfwezigheid = async (req, res) => {
  res.render('subject-afwezigheid', {
  });
};




