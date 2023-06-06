import DataSource from '../lib/DataSource.js';

export const home = async (req, res) => {

  const userRepository = DataSource.getRepository('User');
  const users = await userRepository.find();

  const userRole = req.user?.role?.label;
  const user = req.user;

  const userDataSubjects = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['subjects'],
  });

  const userSubjects = userDataSubjects.subjects;

  const userDataFeedbacks = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['feedbacks', 'feedbacks.subjects', 'feedbacks.teacher'],
  });

  const userFeedbacks = userDataFeedbacks.feedbacks;

  const allowedRoles = new Set(['Admin', 'Teacher', 'Student', 'Coach']);
  const shouldRenderSubjectsAndFeedbacks = allowedRoles.has(userRole);

  const renderData = {
    user,
    users,
  };

  if (shouldRenderSubjectsAndFeedbacks) {
    renderData.subjects = userSubjects;
    renderData.feedbacks = userFeedbacks;
  }

  res.render('home', renderData);
};
