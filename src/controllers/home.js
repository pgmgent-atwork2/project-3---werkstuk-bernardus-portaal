import DataSource from "../lib/DataSource.js";
import { PUBLIC_PATH, BASE_URL } from "../consts.js";
import path from "path";
import user from "../models/user.js";

export const home = async (req, res) => {
   const userRepository = DataSource.getRepository('User');
   const users = await userRepository.find();


   const userRole = req.user.role.label;

   if (userRole === "Admin") {
      res.render("Admin", {
         user: req.user,
         users,
      });
   } else if (userRole === "Teacher") {
      res.render("Teacher", {
         user: req.user,
         users,
      });
   } else if (userRole === "Student") {
      res.render("Student", {
         user: req.user,
         users,
      });
   } else if (userRole === "Coach") {
      res.render("Coach", {
         user: req.user,
         users,
      });
   } else {
      res.render("home", {
         user: req.user,
         users,
      });
   }
};
