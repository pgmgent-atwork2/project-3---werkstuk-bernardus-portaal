/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';


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
    });
};
