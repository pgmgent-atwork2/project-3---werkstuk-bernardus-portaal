/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';

export const home = async (req, res) => {
  const userRepository = DataSource.getRepository('User');
  const users = await userRepository.find({
    relations: ['role', 'class'],
  });

  const userRole = req.user?.role?.label;
  const { user } = req;
  const userId = req.user.id;

  const userData = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['subjects', 'class'],
  });
  const userSubjects = userData?.subjects;

  const feedbackRepository = DataSource.getRepository('Feedback');
  const feedbacks = await feedbackRepository.find({
    where: {
      student: { id: userId },
    },
    relations: ['subjects'],
  });

  const allowedRoles = new Set(['Admin', 'Teacher', 'Student', 'Coach']);
  const shouldRenderSubjectsAndFeedbacks = allowedRoles.has(userRole);

if (userRole === 'Admin') {
  res.render('admin', {
    layout: 'admin',
    user,
    users,
    title: 'Home',
  });
} else if (userRole === 'Coach') {
  res.render('homeCoach', {
    user,
    title: 'Home',
  });
} else {
  res.render('home', {
    user,
    users,
    feedbackData: feedbacks,
    title: 'Home',
    subjects: userSubjects,
  });
}
}
