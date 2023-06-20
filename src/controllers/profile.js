/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';
import jwt from 'jsonwebtoken';


export const profile = async (req, res) => {
const userRepository = DataSource.getRepository('User');
const users = await userRepository.find();

const userRole = req.user?.role?.label;
const user = req.user;

const userData = await userRepository.findOne({
    where: {
    id: user.id,
    },
});

const userSubjects = userData.subjects;



res.render('profile', {
    user: req.user,
    users,
    title: "Profiel",
    });
};

export const profileDetail = async (req, res) => {
  const { token } = req.cookies;
  const tokenDeco = jwt.decode(token);

  const user = req.user;

  const userRepository = DataSource.getRepository('User');
  const userId = req.params.id; // Haal het gebruikers-ID uit de URL

  const users = await userRepository.findOne({
    where: {
        id: userId,
    },
    relations: ['role', 'class']
  });

  console.log(user);
  res.render('admin/userDetail', {
    layout: 'admin',
    user,
    users,
    title: "Profiel"
  });
};

