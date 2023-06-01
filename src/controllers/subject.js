import DataSource from "../lib/DataSource.js";


export const getSubjects = async (req, res) => {
    res.render("subjects", {
        user: req.user,
        title : "Vakken"
     });
};

export const getSubjectsDetail = async (req, res) => {
    res.render("subject-detail", {
        user: req.user,
        title : "Vakken Detail"
     });
};

