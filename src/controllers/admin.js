/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';
import jwt from 'jsonwebtoken';

export const teachers = async (req, res) => {
  const { token } = req.cookies;
  const tokenDeco = jwt.decode(token);

  const { user } = req;

  const userRepository = DataSource.getRepository('User');
  const users = await userRepository.find({
    relations: ['role'],
  });

  const adminUser = users.find((user) => user.role.label === 'Admin');

  res.render('admin/teachers', {
    layout: 'admin',
    user: adminUser,
    users,
  });
};


export const students = async (req, res) => {
  const userRepository = DataSource.getRepository('User');
  const users = await userRepository.find({
    relations:['role'],
  });

  const userRole = req.user?.role?.label;
  const { user } = req;

  const adminUser = users.find((user) => user.role.label === 'Admin');

res.render('admin/students', {
    layout: 'admin',
    user: adminUser,
    users,
    });
};

export const coaches = async (req, res) => {
  const userRepository = DataSource.getRepository('User');
  const users = await userRepository.find({
    relations:['role'],
  });

  const userRole = req.user?.role?.label;
  const { user } = req;

  const adminUser = users.find((user) => user.role.label === 'Admin');

res.render('admin/coaches', {
    layout: 'admin',
    user: adminUser,
    users,
    });
};