/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';
import DataSource from '../lib/DataSource.js';


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

    // Gebruik req.user.id om de ingelogde gebruiker op te halen
    const teacherId = req.user.id;

    const feedback = await feedbackRepository.findOne({
      where: {
        text: req.body.text,
        teacher: teacherId
      },
      relations: ['users', 'teacher'],
    });

    if (feedback) {
      res
        .status(200)
        .send({ status: `Posted feedback with id ${feedback.id}.` });
      return;
    }

    // Save the feedback in the repository
    req.body.teacher = teacherId;
    const insertedFeedback = await feedbackRepository.save(req.body);

    res
      .status(200)
      .redirect('/feedbackDashboard')
      .send({ status: `Posted feedback with id ${insertedFeedback.id}.` });
  } catch (error) {
    next(error.message);
  }
};




export const getAllFeedbacks = async (req, res) => {
const userRepository = DataSource.getRepository('User');
const users = await userRepository.find();

const userRole = req.user?.role?.label;
const {user} = req;

const feedbackRepository = DataSource.getRepository('Feedback');

const feedbackData = await feedbackRepository.find({
  relations: ['subjects', 'student','users','teacher'],
});

const students = await userRepository.find({
  where: {
    role: {
      id: 3
    }
  }
})

const userFeedbackdata = feedbackData;
console.log(userFeedbackdata);

res.render('feedbackDashboard', {
  user,
  userFeedbackdata,
  students
    });
};

