/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';
import jwt from 'jsonwebtoken';


export const getFeedbacks = async (req, res) => {
  const { token } = req.cookies;
  const tokenDeco = jwt.decode(token);

  const userRepository = DataSource.getRepository('User');
  const feedbackRepository = DataSource.getRepository('Feedback');
  

  
  const user = req.user;

  const userData = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['feedbacks', 'feedbacks.subjects','feedbacks.teacher','feedbacks.student','role']
  });

  const userFeedbacks = userData.feedbacks;

  res.render('feedback', {
    user: userData,
    feedbacks: userFeedbacks,
  });
};

export const postFeedbacks = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const tokenDeco = jwt.decode(token);

    if (!req.body.text)
      throw new Error('Please provide a text for your feedback.');

    const feedbackRepository = DataSource.getRepository('Feedback');


    const feedback = await feedbackRepository.findOne({
      where: { 
        text: req.body.text,
        student: { id: req.body.user_feedback }, 
      },
      relations: ['users'],
    });

        if (feedback) {
      res
        .status(200)
        .alert({ status: `Posted feedback with id ${feedback.id}.` });
      return;
    }

    // save the playlist in the repository
    const insertedFeedback = await feedbackRepository.save(req.body);

    res
      .redirect('/feedbackDashboard')
      .status(200)
      .alert({ status: `Posted feedback with id ${insertedFeedback.id}.` });
  } catch (error) {
    next(error.message);
  }
};

export const getAllFeedbacks = async (req, res) => {
const userRepository = DataSource.getRepository('User');
const users = await userRepository.find();

const userRole = req.user?.role?.label;
const user = req.user;

const feedbackRepository = DataSource.getRepository('Feedback');

const feedbackData = await feedbackRepository.find({
  relations: ['subjects', 'student','users','teacher'],
});


const userFeedbackdata = feedbackData;
console.log(userFeedbackdata);

res.render('feedbackDashboard', {
  user,
  userFeedbackdata,
    });
};


export const getAllFeedbacksByStudent = async (req, res) => {

const userRepository = DataSource.getRepository('User');
const users = await userRepository.find();

const userRole = req.user?.role?.label;
const feedbackId = req.params.id;

const userData = await userRepository.find({
  relations: ['feedbacks.student',],
});

console.log(userData);

res.render('feedbackDashboard', {
    user: req.user,
    users,
    });
};










