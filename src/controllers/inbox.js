/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';


export const getInbox = async (req, res) => {
const userRepository = DataSource.getRepository('User');
const users = await userRepository.find();

const userRole = req.user?.role?.label;
const {user} = req;

const userData = await userRepository.find({});

// console.log(userData);

res.render('inbox', {
    user: req.user,
    users,
    title: "Inbox"
    });
};