/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';

export const home = async (req, res) => {
  const userRepository = DataSource.getRepository('User');
  const users = await userRepository.find({
    relations:['role'],
  });

  const userRole = req.user?.role?.label;
  const { user } = req;
  const userId = req.user.id;

  const userDataSubjects = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['subjects'],
  });
  const userSubjects = userDataSubjects.subjects;
  const feedbackRepository = DataSource.getRepository('Feedback');
  const feedbacks = await feedbackRepository.find({
    where: {
      student: { id: userId },
    },
    relations: ['subjects', 'teacher'],
  });

  console.log(users)
  const allowedRoles = new Set(['Admin', 'Teacher', 'Student', 'Coach']);
  const shouldRenderSubjectsAndFeedbacks = allowedRoles.has(userRole);

  if (userRole === 'Admin') {
    res.render('admin', {
      layout: 'admin',
      user,
      users,
    });
  } else {
    const renderData = {
      user,
      users,
      feedbackData: feedbacks,
    };

    if (shouldRenderSubjectsAndFeedbacks) {
      renderData.subjects = userSubjects;
    }

    res.render('home', renderData);
  }
};
