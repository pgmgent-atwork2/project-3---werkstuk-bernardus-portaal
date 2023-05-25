/**
 * A Register Controller
 */

import { getConnection } from 'typeorm';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
// errors
const formErrors = req.formErrors ? req.formErrors : [];

// input fields
const inputs = [
{
name: 'email',
label: 'E-mail',
type: 'text',
value: req.body?.email ? req.body.email : '',
error: req.formErrorField?.email ? req.formErrorField.email : '',
},
{
name: 'password',
label: 'Wachtwoord',
type: 'password',
value: req.body?.password ? req.body.password : '',
error: req.formErrorField?.password ? req.formErrorField.password : '',
},
];

// get the roles
const roleRepository = getConnection().getRepository('Role');
const roles = await roleRepository.find();

// render the register page
res.render('register', {
layout: 'authentication',
inputs,
formErrors,
roles,
});
};

export const postRegister = async (req, res, next) => {
try {
const errors = validationResult(req);
if (!errors.isEmpty()) {
req.formErrorField = {};
errors.array().forEach(({ msg, param }) => {
      req.formErrorField[param] = msg;
});
return next();
}
// get the user repo
const userRepository = getConnection().getRepository('User');

// validate if the user exists
const user = await userRepository.findOne({
where: { email: req.body.email },
});

// check if we found a user
if (user) {
req.formErrors = [{ message: 'Gebruiker bestaat reeds.' }];
next();
}
// hash the password
const hashedPassword = bcrypt.hashSync(req.body.password, 12);

// create a new user
await userRepository.save({
email: req.body.email,
password: hashedPassword,
roles: req.body.role,
});

// go to login page
res.redirect('/login');
} catch (error) {
next(error.message);
}
};

export const login = async (req, res) => {
// errors
const formErrors = req.formErrors ? req.formErrors : [];

// input fields
const inputs = [
{
name: 'userName',
label: 'Gebruikersnaam',
type: 'text',
value: req.body?.userName ? req.body.userName : '',
error: req.formErrorField?.userName ? req.formErrorField.userName : '',
},
{
name: 'password',
label: 'Wachtwoord',
type: 'password',
value: req.body?.password ? req.body.password : '',
error: req.formErrorField?.password ? req.formErrorField.password : '',
},
];

// render the login page
res.render('login', {
layout: 'authentication',
inputs,
formErrors,
});
};

export const postLogin = async (req, res, next) => {
try {
const errors = validationResult(req);
if (!errors.isEmpty()) {
req.formErrorField = {};
errors.array().forEach(({ msg, param }) => {
      req.formErrorField[param] = msg;
});
return next();
}
// get the user repo
const userRepository = getConnection().getRepository('User');

// validate if the user exists
const user = await userRepository.findOne({
where: { userName: req.body.userName },
relations: ['roles'],
});

// check if we found a user
if (!user) {
req.formErrors = [{ message: 'Gebruiker is onbekend' }];
return next();
}

const roles = getConnection().getRepository('Role');
const role = await roles.findOne({
where: { id: user.roles.id },
});

// check if incoming password is equal with the one in our database
const isEqual = bcrypt.compareSync(req.body.password, user.password);

// if not equal, send out some errors
if (!isEqual) {
req.formErrors = [{ message: 'Wachtwoord is onjuist.' }];
return next();
}

// create a webtoken
const token = jwt.sign(
{
      userId: user.id,
      username: user.userName,
      role: role.label,
      roleId: role.id,
},
process.env.TOKEN_SALT,
{ expiresIn: '1h' }
);

// add the cookie to the response
res.cookie('token', token, { httpOnly: true });

// redirect to home page
res.redirect('/');
} catch (error) {
next(error.message);
}
};

export const logout = async (req, res, next) => {
try {
res.clearCookie('token');
return res.redirect('/login');
} catch (error) {
next(error.message);
}
};
