import DataSource from "../lib/DataSource.js";
import { PUBLIC_PATH, BASE_URL } from "../consts.js";
import path from "path";

export const home = async (req, res) => {
   const userRepository = DataSource.getRepository('User');
   const users = await userRepository.find();
   if(!req.user) {
      res.redirect('/login');
      return;   }
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
      res.render("Home", {
         user: req.user,
         users,
      });
   }
};
