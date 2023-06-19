/* eslint-disable prettier/prettier */
import DataSource from "../../lib/DataSource.js";

export const getSubjects = async (req, res, next) => {  
    try {
        const subjectRepository = DataSource.getRepository('Subject');

        res.status(200).json(await subjectRepository.find({
            where: { id: req.user },
            relations: ['users',],
    }));
} catch (error) {
    next(error.message);
}
};
