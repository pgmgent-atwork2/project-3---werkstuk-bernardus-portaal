/* eslint-disable prettier/prettier */
// import statements
import express from 'express';
// import path from 'path';
import dotenv from 'dotenv';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import { VIEWS_PATH } from './consts.js';
import DataSource from './lib/DataSource.js';

import loginAuthentication from './middleware/validation/loginAuthentication.js';

import { jwtAuth } from './middleware/jwtAuth.js';
import { login, logout, postLogin } from './controllers/authentication.js';
import { home } from './controllers/home.js';
import swaggerDefinition from './docs/swagger.js';

import {
  getUsers,
  postUser,
  updateUser,
  getUserById,
  deleteUserById,
} from './controllers/api/user.js';

import { getAbsence } from './controllers/absence.js';

import { getSubjects, getSubjectDetails, getSubjectPoints, getSubjectDocument } from "./controllers/subjects.js";



import { getSchedule } from "./controllers/schedule.js";

import { getFeedbacks, postFeedbacks, getAllFeedbacks,} from "./controllers/feedback.js";

import { getPoints } from "./controllers/rapport.js";

import { profile } from "./controllers/profile.js";

import { getInbox } from "./controllers/inbox.js";


dotenv.config();

// import login and register

// import Users
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
app.use(cookieParser());

const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', VIEWS_PATH);

app.get('/', jwtAuth, home);
app.get('/absence', getAbsence);


app.get('/subjects/:id/points', jwtAuth, getSubjectPoints);
app.get('/subjects/:id/documents', jwtAuth, getSubjectDocuments);
app.get('/subjects/:id', jwtAuth, getSubjectDetails);
app.get('/subjects', jwtAuth, getSubjects);

app.get('/feedback', jwtAuth, getFeedbacks, );
app.get('/feedbackDashboard', jwtAuth, getAllFeedbacks)


app.post('/feedbackDashboard', jwtAuth, postFeedbacks,)

app.get('/rapport', jwtAuth, getPoints);
app.get('/rapport/:id', jwtAuth, getSubjectPoints, getPoints);

app.get('/profile', jwtAuth, profile);



app.get('/schedule', jwtAuth, getSchedule);
app.get('/inbox', jwtAuth, getInbox);

app.get('/login', login);
app.post('/login', loginAuthentication, postLogin, login);

app.get('/logout', logout);

// API routes
app.get('/api/users',jwtAuth, getUsers);
app.post('/api/user', jwtAuth, postUser);
app.put('/api/user', jwtAuth, updateUser);
app.get('/api/user/:id', jwtAuth, getUserById);
app.delete('/api/user/:id', jwtAuth, deleteUserById);


DataSource.initialize()
  .then(() => {
    // start the server
    app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
