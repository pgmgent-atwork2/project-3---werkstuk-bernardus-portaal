/* eslint-disable prettier/prettier */
export const home = async (req, res) => {
const userRole = req.user.role.label;
   if (userRole === "Admin") {
      res.render("admin", { user: req.user });
   } else if (userRole === "Teacher") {
      res.render("teacher", { user: req.user });
   } else if (userRole === "Student") {
      res.render("student", { user: req.user });
   } else if (userRole === "Coach") {
      res.render("coach", { user: req.user });
   } else {
      res.status(404).send("Gebruikersrol niet herkend");
   }
};
