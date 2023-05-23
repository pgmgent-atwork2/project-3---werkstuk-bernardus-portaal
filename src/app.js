// import statements
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { create } from "express-handlebars";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import { VIEWS_PATH } from "./consts.js";
import DataSource from "./lib/DataSource.js";
import cookieParser from "cookie-parser";

import validation from './middleware/validation/validAuthentication.js';
import { jwtAuth } from "./middleware/jwtAuth.js";

	
dotenv.config();

import { home } from "./controllers/home.js";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './docs/swagger.js';

// import login and register
import {
   login,
   logout,
   postLogin,
} from './controllers/authentication.js';

//import Users
import {
   getUsers,
   postUser,
   updateUser,
   getUserById,
   deleteUserById,
} from './controllers/api/user.js';



const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
	
app.use(cookieParser());



const hbs = create({
   helpers: HandlebarsHelpers,
   extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

app.get("/", home);

app.get('/login', ...validation, postLogin, login);
app.get('/logout', logout);

app.get("/", (req, res) => {
   res.sendFile(path.resolve("src", "views", "index.html"));
});



app.get('/api/users',jwtAuth,getUsers);
app.post('/api/user', jwtAuth, postUser);
app.put('/api/user', jwtAuth, updateUser);
app.get('/api/user/:id', jwtAuth,getUserById);
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
   .catch(function (error) {
      console.log("Error: ", error);
});
