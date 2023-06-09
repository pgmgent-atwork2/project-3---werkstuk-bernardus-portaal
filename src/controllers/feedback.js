/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';
import DataSource from '../lib/DataSource.js';


export const getFeedbacks = async (req, res) => {
  const { token } = req.cookies;
  const tokenDeco = jwt.decode(token);

  const feedbackRepository = DataSource.getRepository('Feedback');

  const userId = req.user.id;

  const feedbacks = await feedbackRepository.find({
    where: {
      student: { id: userId },
    },
    relations: ['subjects', 'teacher'],
  });

  // console.log(feedbacks);
  
  res.render('feedback', {
    user: req.user,
    feedbackData: feedbacks,
  });
};

export const postFeedbacks = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const tokenDeco = jwt.decode(token);

    if (!req.body.text)
      throw new Error('Please provide a text for your feedback.');

    const feedbackRepository = DataSource.getRepository('Feedback');

    const teacherId = req.user.id;

    const feedback = await feedbackRepository.findOne({
      where: {
        text: req.body.text,
        teacher: teacherId,
      },
      relations: ['users', 'teacher',],
    });

    if (feedback) {
      res
        .status(200)
        .send({ status: `Posted feedback with id ${feedback.id}.` });
      return;
    }

    req.body.teacher = teacherId;

    console.log('FB Request: ', req.body);

    const insertedFeedback = await feedbackRepository.create(req.body);
    const savedFeedback = await feedbackRepository.save(insertedFeedback);

    res
      .status(200)
      .redirect('/feedbackDashboard')
      .send({ status: `Posted feedback with id ${savedFeedback.id}.` });
  } catch (error) {
    next('Failed to post feedback: ', error,  error.message);
  }
};

export const getAllFeedbacks = async (req, res) => {
const userRepository = DataSource.getRepository('User');
const subjectsRepository = DataSource.getRepository('Subject')
const users = await userRepository.find();

const userRole = req.user?.role?.label;
const {user} = req;
console.log(user);

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

const subjects = await subjectsRepository.find({
  where: {
    teacher: {
      id: user.id
    }
  }
})

const userFeedbackdata = feedbackData;
// console.log(userFeedbackdata);

res.render('feedbackDashboard', {
  user,
  userFeedbackdata,
  students,
  subjects
    });
};
















