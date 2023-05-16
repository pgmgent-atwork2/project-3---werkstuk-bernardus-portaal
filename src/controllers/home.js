import DataSource from "../lib/DataSource.js";
import { PUBLIC_PATH, BASE_URL } from "../consts.js";
import path from "path";

export const home = async (req, res) => {
res.render("home", {
});
};