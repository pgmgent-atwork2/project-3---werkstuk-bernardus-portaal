/* eslint-disable prettier/prettier */
// import statements
import express from 'express';
// import path from 'path';
import dotenv from 'dotenv';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import multer from "multer";
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import { VIEWS_PATH } from './consts.js';
import DataSource from './lib/DataSource.js';
import { saveAvatar  } from "./middleware/saveAvatar.js";
import { subjectAvatar  } from "./middleware/subjectFolder.js";


import { jwtAuth } from './middleware/jwtAuth.js';

import {
  login,
  register,
  postLogin,
  postRegister,
  logout,
  deleteUserById
} from "./controllers/authentication.js";

import registerAuthentication from "./middleware/validation/registerAuthentication.js";
import loginAuthentication from "./middleware/validation/loginAuthentication.js";

import { home, } from './controllers/home.js';
import swaggerDefinition from './docs/swagger.js';

import {
  getUsers,
  postUser,
  updateUser,
  getUserById,
} from './controllers/api/user.js';

import { getAbsence } from './controllers/absence.js';

import { getSubjects, getSubjectDetails, getSubjectPoints, getSubjectDocuments, getSubjectRapport, getSubjectAfwezigheid,getSubjectRapportLink } from "./controllers/subjects.js";



import { getSchedule } from "./controllers/schedule.js";

import { getFeedbacks,  postFeedbacks, getAllFeedbacks, updateFeedback, deleteFeedback, getAllFeedbacksCoach, updateFeedbackCoach, deleteFeedbackCoach} from "./controllers/feedback.js";

import { getPoints, getAllPoints, postPoints, updatePointAndComment, deletePoint, } from "./controllers/rapport.js";

import { profile, profileDetail } from "./controllers/profile.js";

import { getInbox } from "./controllers/inbox.js";

import { teachers, students, coaches, getSubjectsForEdit, renameSubjects, newSubject, deleteSubject } from "./controllers/admin.js";



dotenv.config();


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

app.get('/', jwtAuth, home,);

// import login and register

app.get("/login", login);
app.get("/register", register);
app.post("/register", registerAuthentication, postRegister, register);
app.post("/login", loginAuthentication, postLogin, login);
app.post("/logout", logout);


app.post('/uploadAvatar', multer().single('avatar'), saveAvatar, (req, res) => {
  res.redirect('/')
});

app.post('/subjectAvatar', multer().single('avatar'), subjectAvatar, (req, res) => {
  res.redirect('/editSubjects')
});

app.get('/logout', logout);

app.get('/absence', jwtAuth, getAbsence);


app.get('/teachers',jwtAuth, teachers);
app.get('/students',jwtAuth, students);
app.get('/coaches', jwtAuth, coaches);

app.get('/editSubjects', getSubjectsForEdit);
app.post('/editSubjects/:id', renameSubjects);
app.post('/editSubjects/', newSubject);
app.post('/deleteSubject/:id', deleteSubject);

app.get('/documents', jwtAuth, getSubjectDocuments);


app.get('/subjects/:id/points', jwtAuth, getSubjectPoints);
app.get('/subjects/:id', jwtAuth, getSubjectDetails, getSubjectPoints);
app.get('/subjects/:id/rapport', jwtAuth, getSubjectRapport);
app.get('/subjects/:id/rapport/link', jwtAuth, getSubjectRapportLink);
app.get('/subjects/:id/afwezigheid', jwtAuth, getSubjectAfwezigheid);
app.get('/subjects', jwtAuth, getSubjects);

app.get('/feedback', jwtAuth, getFeedbacks, );

app.get('/feedbackDashboard', jwtAuth, getAllFeedbacks)
app.post('/feedbackDashboard', jwtAuth, postFeedbacks,)
app.post('/feedbackDashboard/:id', jwtAuth, updateFeedback);
app.post('/deleteFeedback/:id', jwtAuth, deleteFeedback);

app.get('/feedbackDashboardCoach', jwtAuth, getAllFeedbacksCoach)
app.post('/feedbackDashboardCoach/:id', jwtAuth, updateFeedbackCoach)
app.post('/deletefeedbackDashboardCoach/:id', jwtAuth, deleteFeedbackCoach)


app.get('/rapport', jwtAuth, getPoints );
app.get('/rapportDashboard', jwtAuth, getAllPoints);
app.post('/rapportDashboard', jwtAuth, postPoints);
app.post('/rapportDashboard/:id', jwtAuth, updatePointAndComment,);
app.post('/deletePoint/:id', jwtAuth, deletePoint);

app.get('/rapport/:id', jwtAuth, getSubjectPoints, getPoints);

app.get('/profile', jwtAuth, profile);
app.get('/user/:id', jwtAuth, profileDetail);



app.get('/schedule', jwtAuth, getSchedule);
app.get('/inbox', jwtAuth, getInbox);


// API routes
app.get('/users',getUsers);
app.post('/user', jwtAuth, postUser);
app.put('/user', jwtAuth, updateUser);
app.get('/user/:id', jwtAuth, getUserById);
app.post('/user/:id', jwtAuth, deleteUserById);


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

export default app;
