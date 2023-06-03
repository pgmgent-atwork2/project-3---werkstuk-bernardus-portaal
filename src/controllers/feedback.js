/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';
import jwt from 'jsonwebtoken';


export const getFeedbacks = async (req, res) => {
  const { token } = req.cookies;
  const tokenDeco = jwt.decode(token);

  const userRepository = DataSource.getRepository('User');
  

  
  const user = req.user;

  const userData = await userRepository.findOne({
    where: {
      id: user.id,
    },
    relations: ['feedbacks', 'feedbacks.subjects','feedbacks.user','role']
  });

  const userFeedbacks = userData.feedbacks;
  console.log(userFeedbacks);
  console.log(userData);

  res.render('feedback', {
    user: userData,
    feedbacks: userFeedbacks,
  });
};







