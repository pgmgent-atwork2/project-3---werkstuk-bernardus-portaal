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
        label: 'Password',
        type: 'password',
        value: req.body?.password ? req.body.password : '',
        error: req.formErrorFields?.password ? req.formErrorFields.password : null,
      },
      {
        name: 'firstname',
        label: 'Voornaam',
        type: 'text',
        value: req.body?.firstname ? req.body.firstname : '',
        error: req.formErrorFields?.firstname ? req.formErrorFields.firstname : null,
      },
      {
        name: 'lastname',
        label: 'Achternaam',
        type: 'text',
        value: req.body?.lastname ? req.body.lastname : '',
        error: req.formErrorFields?.lastname ? req.formErrorFields.lastname : null,
      },
      {
        name: 'age',
        label: 'Geboortedatum',
        type: 'text',
        value: req.body?.age ? req.body.age : '',
        error: req.formErrorFields?.age ? req.formErrorFields.age : null,
      },
      {
        name: 'phone',
        label: 'GSM-nummer',
        type: 'tel',
        value: req.body?.phone ? req.body.phone : '',
        error: req.formErrorFields?.phone ? req.formErrorFields.phone : null,
      },
      {
        name: 'address',
        label: 'Address',
        type: 'text',
        value: req.body?.address ? req.body.address : '',
        error: req.formErrorFields?.address ? req.formErrorFields.address : null,
      },
      {
        name: 'country',
        label: 'Geboorteland',
        type: 'text',
        value: req.body?.country ? req.body.country : '',
        error: req.formErrorFields?.country ? req.formErrorFields.country : null,
      },
      {
        name: 'city',
        label: 'Stad',
        type: 'text',
        value: req.body?.city ? req.body.city : '',
        error: req.formErrorFields?.city ? req.formErrorFields.city : null,
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'text',
        value: req.body?.gender ? req.body.gender : '',
        error: req.formErrorFields?.gender ? req.formErrorFields.gender : null,
      },
      {
        name: 'level',
        label: 'Level',
        type: 'text',
        value: req.body?.level ? req.body.gender : '',
        error: req.formErrorFields?.level ? req.formErrorFields.level : null,
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
      title: 'Registreren'
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
            const userRepository = await DataSource.getRepository("User");
            const userExists = await userRepository.findOne({
                where: {
                    username: req.body.username,
                    email: req.body.email,
                }
            });

            if(userExists) {
                req.formErrors = [{ message: "Gebruiker bestaat al" }];
                return next();
            };

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

            await userRepository.save(user);

            res.redirect("/");
        
    } catch(e) {
        next(e.message);
    };
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
