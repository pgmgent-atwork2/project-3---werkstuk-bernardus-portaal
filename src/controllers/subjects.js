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
    relations: ['teacher',]
  });

  const pointsRepository = DataSource.getRepository('Points')

  const pointsData = await pointsRepository.find({
    where: {
      student:{
        id:user.id
      },
      subjects: {
        id: subjectId,
      },
    },
    relations: ['teacher', 'subjects', 'student'],
  });


  console.log(pointsData)

  res.render('subject-detail', {
    user, 
    subject: subjectData,
    points:pointsData,
    title: "Vakken"
  });
};

export const getSubjectPoints = async (req, res) => {
 
  res.render('subject-punten', {
    title: "Punten"
  });
};

export const getSubjectDocuments = async (req, res) => {
  const userRepository = DataSource.getRepository('User');

  const user = req.user;

  const userData = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['subjects','role', 'subjects.teacher'],
  });
  res.render('subject-document', {
        user: userData,
    title: "Documents"
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




