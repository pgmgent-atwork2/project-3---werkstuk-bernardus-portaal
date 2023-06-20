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
    title: "Leerkrachten",
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
    title: "Studenten",
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
    title: "Coaches",
    user: adminUser,
    users,
    });
};

export const getSubjectsForEdit = async (req, res) => {

  const userRepository = DataSource.getRepository('User');
  const users = await userRepository.find({
    relations:['role'],
  });


  const subjectRepository = DataSource.getRepository('Subject');

  const subjectData = await subjectRepository.find({
      where: {
      name: req.body.name,
    },
    relations: ['teacher',]
  });

  const adminUser = users.find((user) => user.role.label === 'Admin');

res.render('admin/editSubjects', {
    layout: 'admin',
    title: "Vakken bewerken",
    user: adminUser,
    subject: subjectData,
    users,
    });
};

export const renameSubjects = async (req, res, next) => {
  console.log('updating');
  try {
    const subjectId = req.params.id;
    const updatedName = req.body.name;

    if (!updatedName) {
      throw new Error('Please provide a text for the updated feedback.');
    }
    const userRepository = DataSource.getRepository('User');
    const subjectRepository = DataSource.getRepository('Subject');

    const subject = await subjectRepository.findOne({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      res.status(404).send({ error: 'Feedback not found.' });
      return;
    }

    subject.name = updatedName;

    const updatedSubject = await subjectRepository.save(subject);
    res.redirect('/editSubjects')
  } catch (error) {
    console.log('opsie daisy, er ging iets mis', error);
    next(error);
  }
};

export const newSubject = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const tokenDeco = jwt.decode(token);

    if (!req.body.name) {
      throw new Error('Please provide a name for your Subject.');
    }

    const subjectRepository = DataSource.getRepository('Subject');
    const usersRepository = DataSource.getRepository('User');

    const subject = await subjectRepository.findOne({
      where: {
        name: req.body.name,
      },
      relations: ['teacher'],
    });

    if (subject) {
      res.status(200).send({ status: `Subject with id ${subject.id} already exists.` });
      return;
    }

    const newSubject = subjectRepository.create({
      name: req.body.name,
    });

    const savedSubject = await subjectRepository.save(newSubject);

    res.status(200).redirect('/editSubjects').send({ status: `Posted subject with id ${savedSubject.id}.` });
  } catch (error) {
    next(error, error.message);
  }
};

export const deleteSubject = async (req, res, next) => {
  console.log('deleting');
  try {
    const subjectId = req.params.id;

    const subjectRepository = DataSource.getRepository('Subject');

    const subject = await subjectRepository.findOne({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      res.status(404).send({ error: 'Subject not found.' });
      return;
    }

    await subjectRepository.delete(subjectId);
    res.redirect('/editSubjects');
  } catch (error) {
    console.log('Oopsie daisy, er ging iets mis', error);
    next(error);
  }
};



