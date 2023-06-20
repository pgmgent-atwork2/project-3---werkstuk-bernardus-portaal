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
    title: "Feedback"
  });
};

export const getAllFeedbacks = async (req, res) => {
const userRepository = DataSource.getRepository('User');
const subjectsRepository = DataSource.getRepository('Subject')
const users = await userRepository.find();

const userRole = req.user?.role?.label;
const userId = req.user.id;
const {user} = req;


const feedbackRepository = DataSource.getRepository('Feedback');

const feedbackData = await feedbackRepository.find({
    where: {
    teacher:{id :userId} 
  },
  relations: ['subjects', 'student','teacher'],
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

console.log(feedbackData);

const userFeedbackdata = feedbackData;
res.render('feedbackDashboard', {
  user,
  userFeedbackdata,
  students,
  subjects
    });
};

export const getAllFeedbacksCoach = async (req, res) => {
const userRepository = DataSource.getRepository('User');
const subjectsRepository = DataSource.getRepository('Subject')
const users = await userRepository.find();

const userRole = req.user?.role?.label;
const userId = req.user.id;
const {user} = req;


const feedbackRepository = DataSource.getRepository('Feedback');

const feedbackData = await feedbackRepository.find({
  relations: ['subjects', 'student','teacher'],
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

console.log(feedbackData);

const userFeedbackdata = feedbackData;
res.render('feedbackDashboard', {
  user,
  userFeedbackdata,
  students,
  subjects,
  title: "Dashboard"
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

export const updateFeedback = async (req, res, next) => {
  console.log('updating');
  try {
    const feedbackId = req.params.id;
    const updatedText = req.body.text;

    if (!updatedText) {
      throw new Error('Please provide a text for the updated feedback.');
    }
    const userRepository = DataSource.getRepository('User');
    const feedbackRepository = DataSource.getRepository('Feedback');

    const teacherId = req.user.id;

    const feedback = await feedbackRepository.findOne({
      where: {
        id: feedbackId,
        teacher: teacherId,
      },
    });

const students = await userRepository.find({
  where: {
    role: {
      id: 3
    }
  }
});

    if (!feedback) {
      res.status(404).send({ error: 'Feedback not found.' });
      return;
    }

    feedback.text = updatedText;

    const updatedFeedback = await feedbackRepository.save(feedback);
    res.redirect('/feedbackDashboard')
  } catch (error) {
    console.log('opsie daisy, er ging iets mis', error);
    next(error);
  }
};

export const deleteFeedback = async (req, res, next) => {
  console.log('deleting');
  try {
    const feedbackId = req.params.id;

    const feedbackRepository = DataSource.getRepository('Feedback');

    const teacherId = req.user.id;

    const feedback = await feedbackRepository.findOne({
      where: {
        id: feedbackId,
        teacher: teacherId,
      },
    });

    if (!feedback) {
      res.status(404).send({ error: 'Feedback not found.' });
      return;
    }

    await feedbackRepository.delete(feedbackId);
    res.redirect('/feedbackDashboard');
  } catch (error) {
    console.log('Oopsie daisy, er ging iets mis', error);
    next(error);
  }
};

export const updateFeedbackCoach = async (req, res, next) => {
  console.log('updating');
  try {
    const feedbackId = req.params.id;
    const updatedText = req.body.text;

    if (!updatedText) {
      throw new Error('Please provide a text for the updated feedback.');
    }
    const userRepository = DataSource.getRepository('User');
    const feedbackRepository = DataSource.getRepository('Feedback');

    const teacherId = req.user.id;

    const feedback = await feedbackRepository.findOne({
      where: {
        id: feedbackId,
        teacher: teacherId,
      },
    });

const students = await userRepository.find({
  where: {
    role: {
      id: 3
    }
  }
});

    if (!feedback) {
      res.status(404).send({ error: 'Feedback not found.' });
      return;
    }

    feedback.text = updatedText;

    const updatedFeedback = await feedbackRepository.save(feedback);
    res.redirect('/feedbackDashboard')
  } catch (error) {
    console.log('opsie daisy, er ging iets mis', error);
    next(error);
  }
};

export const deleteFeedbackCoach = async (req, res, next) => {
  console.log('deleting');
  try {
    const feedbackId = req.params.id;

    const feedbackRepository = DataSource.getRepository('Feedback');

    const teacherId = req.user.id;

    const feedback = await feedbackRepository.findOne({
      where: {
        id: feedbackId,
        teacher: teacherId,
      },
    });

    if (!feedback) {
      res.status(404).send({ error: 'Feedback not found.' });
      return;
    }

    await feedbackRepository.delete(feedbackId);
    res.redirect('/feedbackDashboard');
  } catch (error) {
    console.log('Oopsie daisy, er ging iets mis', error);
    next(error);
  }
};