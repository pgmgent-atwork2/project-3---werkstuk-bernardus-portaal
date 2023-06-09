/* eslint-disable prettier/prettier */
import DataSource from '../lib/DataSource.js';


export const getPoints = async (req, res) => {
const userRepository = DataSource.getRepository('User');

const userRole = req.user?.role?.label;
const user = req.user;

const userData = await userRepository.findOne({
    where: {
    id: user.id,
    },
    relations: ['points','points.subjects.teacher','role']
});

const userPoints = userData.points;

res.render('rapport', {
    user: userData,
    points: userPoints,
    });
};
