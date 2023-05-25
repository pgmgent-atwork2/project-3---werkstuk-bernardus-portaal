import DataSource from "../lib/DataSource.js";


export const home = async (req, res) => {
   const userRepository = DataSource.getRepository('User');
   const users = await userRepository.find();


   const userRole = req.user?.role?.label;

      if (userRole === "Admin") {
      res.render("home", {
         user: req.user,
         users,
      });
   } else if (userRole === "Teacher") {
      res.render("home", {
         user: req.user,
         users,
      });
   } else if (userRole === "Student") {
      res.render("home", {
         user: req.user,
         users,
      });
   } else if (userRole === "Coach") {
      res.render("home", {
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
