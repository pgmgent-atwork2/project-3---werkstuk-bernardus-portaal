/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
      /**
       * An authentication Controller
       */

      import { validationResult } from 'express-validator';
      import jwt from 'jsonwebtoken';
      import DataSource from '../lib/DataSource.js';
      import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { token } = req.cookies;
    const tokenDeco = jwt.decode(token);

    const { user } = req;

    const userRepository = DataSource.getRepository('User');
    const users = await userRepository.find({
      relations: ['role'],
    });

    const adminUser = users.find((user) => user.role.label === 'Admin');

    // Retrieve form errors
    const formErrors = req.formErrors ? req.formErrors : [];

    // Fetch subjects from the database (replace with your own database logic)
    const subjectRepository = DataSource.getRepository('Subject');
    const subjects = await subjectRepository.find();

    // Input fields
    const inputs = [
      {
        name: 'email',
        label: 'E-mail',
        type: 'text',
        value: req.body?.email ? req.body.email : '',
        error: req.formErrorFields?.email ? req.formErrorFields.email : '',
      },
      {
        name: 'username',
        label: 'Gebruikersnaam',
        type: 'text',
        value: req.body?.username ? req.body.username : '',
        error: req.formErrorFields?.username ? req.formErrorFields.username : '',
      },
      {
        name: 'password',
        label: 'Wachtwoord',
        type: 'password',
        value: req.body?.password ? req.body.password : '',
        error: req.formErrorFields?.password ? req.formErrorFields.password : null,
      },
      // Add more input fields here if needed

      // Subject dropdown
      {
        name: 'subject',
        label: 'Onderwerp',
        type: 'select',
        options: subjects.map((subject) => ({
          value: subject.id,
          label: subject.name,
        })),
        value: req.body?.subject ? req.body.subject : '',
        error: req.formErrorFields?.subject ? req.formErrorFields.subject : null,
      },
    ];

    // Get the roles
    const roleRepository = DataSource.getRepository('Role');
    const roles = await roleRepository.find();

    // Render the register page
    res.render('register', {
      layout: 'admin',
      user: adminUser,
      inputs,
      formErrors,
      roles,
      subjects,
      title: 'Registreren',
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorFields = {};
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });

      req.formErrorFields = errorFields;

      return next();
    }

    const userRepository = await DataSource.getRepository('User');
    const userExists = await userRepository.findOne({
      where: {
        username: req.body.username,
        email: req.body.email,
      },
    });

    if (userExists) {
      req.formErrors = [{ message: 'Gebruiker bestaat al' }];
      return next();
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = await userRepository.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      role: { id: req.body.role },
      age: req.body.age,
      level: req.body.level,
      city: req.body.city,
      country: req.body.country,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
    });

    const subjectRepository = await DataSource.getRepository('Subject');
    const selectedSubject = await subjectRepository.findOne({
      where: { id: req.body.subject },
      relations: ['teacher'],
    });

    if (!user.subjects) {
      user.subjects = []; // Initialiseer de array als deze nog niet bestaat
    }

    user.subjects.push(selectedSubject); // Voeg het vak toe aan de array van vakken van de gebruiker

    const teachers = selectedSubject.teacher || []; // Haal de huidige leraren van het vak op

    teachers.push(user); // Voeg de nieuwe leraar toe aan de array van leraren

    selectedSubject.teacher = teachers; // Wijs de bijgewerkte array van leraren toe aan het vak

    await subjectRepository.save(selectedSubject); // Sla het vak op met de bijgewerkte leraren

    await userRepository.save(user);

    res.redirect('/');
  } catch (error) {
    next(error.message);
  }
};



export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const userRepository = DataSource.getRepository('User');
    const user = await userRepository.findOne({ 
      where:{
        id: userId
      }
    });

    if (!user) {
      // Gebruiker niet gevonden
      return res.status(404).send('Gebruiker niet gevonden');
    }

    await userRepository.remove(user);

    // Gebruiker succesvol verwijderd
    res.send('<script>alert("Gebruiker succesvol verwijderd"); window.location.href = "/";</script>');
  } catch (error) {
    // Fout bij het verwijderen van de gebruiker
    console.error(error);
    res.status(500).send('Fout bij het verwijderen van de gebruiker');
  }
};

export const login = async (req, res) => {
// errors
const {formErrors} = req;

// input fields
const inputs = [
{
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
},
{
      name: 'password',
      label: 'Password',
      type: 'password',
      password: req.body?.password ? req.body.password : '',
      error: req.formErrorFields?.password
      ? req.formErrorFields.password
      : null,
},
];

// render the login page
res.render('login', {
layout: 'authentication',
// toevoegen van data aan de view
inputs,
formErrors,
});
};

export const postLogin = async (req, res, next) => {
try {
const errors = validationResult(req);

// if we have validation errors
if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
      errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;
      console.log('Error:', errorFields);
      return next();
} 
      // get the user
      const userRepository = await DataSource.getRepository('User');
      // change email to lowercase letters
      const lwEmail = req.body.email.toLowerCase();

      // get a user with a specific email adress
      const user = await userRepository.findOne({
      where: {
      email: lwEmail,
      },
      });

      // authentication validation
      if (!user) {
      req.formErrors = [{ message: 'Gebruiker bestaat niet.' }];
      console.log('Error!', req.formErrors);
      return next();
      }

      // compare hashed password with saved hashed password
      console.log(req.body.password, bcrypt.hashSync(req.body.password, 10));
      const givenPassword = req.body.password; // supersecret
      const dbPassword = user.password; // $2b$10$9sWBzAraG2EQHZs62uyVdeH2dJxDAM4aWwlcNKWHAX.m2ZUjneEQa
      const isAMatch = bcrypt.compareSync(givenPassword, dbPassword); // true or false

      // password check
      if (!isAMatch) {
      req.formErrors = [{ message: 'Wachtwoord is niet correct.' }];
      return next();
      }
      console.log('Current active user: ', user)
      // create the JWT web token, aka our identity card
      const token = jwt.sign(
      { id: user.id, email: req.body.email},
      process.env.TOKEN_SALT,
      { expiresIn: '1h' }
      );

      // create a cookie and add this to the response
      res.cookie('token', token, { httpOnly: true });

      // redirect to our root
      res.redirect('/');

} catch (e) {
next(e.message);
}
};

export const logout = async (req, res) => {
res.clearCookie("token");
res.redirect("/login");
};
