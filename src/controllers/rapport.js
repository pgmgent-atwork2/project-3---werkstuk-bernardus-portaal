/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';
import DataSource from '../lib/DataSource.js';



export const getPoints = async (req, res) => {
  const userRepository = DataSource.getRepository('User');
  const subjectsRepository = DataSource.getRepository('Subject')
  const pointsRepository = DataSource.getRepository('Points');
  const classRepository = DataSource.getRepository('Class')

  const { user } = req;

  const pointsData = await pointsRepository.find({
    where: {
      student: {
        id: user.id,
      },
    },
    relations: ['teacher', 'subjects', 'student','student.class'],
  });

  const students = await userRepository.find({
  where: {
    role: {
      id: 3
    }
  }, 
  relations:['class']
})

const subjects = await subjectsRepository.find({
  where: {
    teacher: {
      id: user.id
    }
  }
})

const className = await classRepository.findOne({
  where: {
    user: {
      id: user.id
    }
  }
})

const userPoints = pointsData;
console.log(className)

res.render('rapport', {
    user,
    userPoints,
    students,
    subjects,
    className,
    title: "Rapport"
    });
};

export const getAllPoints = async (req, res) => {
  const userRepository = DataSource.getRepository('User');
  const subjectsRepository = DataSource.getRepository('Subject')
  
  const pointsRepository = DataSource.getRepository('Points');

  const { user } = req;
  console.log(user);

  const pointsData = await pointsRepository.find({
    where: {
      teacher: {
        id: user.id,
      },
    },
    relations: ['student', 'subjects'],
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

const userPoints= pointsData;

  res.render('rapportDashboard', {
    user,
    userPoints,
    students,
    subjects
  });
};

export const postPoints = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const tokenDeco = jwt.decode(token);

    if (!req.body.point)
      throw new Error('Please provide a number for your point.');

    const pointsRepository = DataSource.getRepository('Points');

    const teacherId = req.user.id;

    const point = await pointsRepository.findOne({
      where: {
        point: req.body.point,
        comment: req.body.comment,
        teacher: teacherId,
      },
      relations: ['student', 'teacher',],
    });

    if (point) {
      res
        .status(200)
        .send({ status: `Posted point with id ${point.id}.` });
      return;
    }

    req.body.teacher = teacherId;

    console.log('P Request: ', req.body);

    const insertedPoint = await pointsRepository.create(req.body);
    const savedPoint = await pointsRepository.save(insertedPoint);

    res
      .status(200)
      .redirect('/rapportDashboard')
      .send({ status: `Posted point with id ${savedPoint.id}.` });
  } catch (error) {
    next( error.message);
  }
};

export const deletePoint = async (req, res, next) => {
  console.log('deleting');
  try {
    const pointId = req.params.id;

    const pointsRepository = DataSource.getRepository('Points');

    const teacherId = req.user.id;

    const point = await pointsRepository.findOne({
      where: {
        id: pointId,
        teacher: teacherId,
      },
    });

    if (!point) {
      res.status(404).send({ error: 'Point not found.' });
      return;
    }

    await pointsRepository.delete(pointId);
    res.redirect('/rapportDashboard');
  } catch (error) {
    console.log('Oopsie daisy, er ging iets mis', error);
    next(error);
  }
};

export const updatePointAndComment = async (req, res, next) => {
  console.log('updating');
  try {
    const itemId = req.params.id;
    const updatedPoint = req.body.point;
    const updatedComment = req.body.comment;

    if (!updatedPoint && !updatedComment) {
      throw new Error('Please provide a text for the updated point or comment.');
    }

    const pointsRepository = DataSource.getRepository('Points');
    const teacherId = req.user.id;

    const item = await pointsRepository.findOne({
      where: {
        id: itemId,
        teacher: teacherId,
      },
    });

    if (!item) {
      res.status(404).send({ error: 'Item not found.' });
      return;
    }

    if (updatedPoint) {
      item.point = updatedPoint;
    }

    if (updatedComment) {
      item.comment = updatedComment;
    }

    const updatedItem = await pointsRepository.save(item);
    res.redirect('/rapportDashboard');
  } catch (error) {
    console.log('Oopsie daisy, er ging iets mis', error);
    next(error);
  }
};


