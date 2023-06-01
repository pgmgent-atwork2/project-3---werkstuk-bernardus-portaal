/* eslint-disable prettier/prettier */
import DataSource from "../../lib/DataSource.js";

export const getUsers = async (req, res, next) => {
   try {

      // get the user repository
      const userRepository = DataSource.getRepository('User');

      // send back to client
      res.status(200).json(await userRepository.find({
            where: { id: req.user },
            relations: ['Subjects', 'Class'],
      }));
   } catch (error) {
      next(error.message);
   }
};




export const postUser = async (req, res, next) => {
      try {
      const userRepository = DataSource.getRepository('User');

      const user = await userRepository.findOne({
         where: { email: req.body.email },
      });

      if (user) {
         res.status(200).json({ status: `Posted user with id ${user.id}.` });
         return;
      }
   } catch (error) {
      next(error.message);
   }
};

export const updateUser = async (req, res, next) => {
   try {
      const userRepository =  DataSource.getRepository('User');
      const user = await userRepository.findOne({
         where: { id: req.body.id },
      });

      const updatedUser = { ...user, ...req.body };

      await userRepository.save(updatedUser);

      res.status(200).json({ status: `Updated user with id: ${req.body.id}.` });
   } catch (error) {
      next(error.message);
   }
};

export const getUserById = async (req, res, next) => {
   try {
      const { id } = req.params;

      const userRepository = DataSource.getRepository('User');
      const user = await userRepository.findOne({ id });

      if (!user) throw new Error(`The user with id: ${id} does not exist.`);

      res.status(200).json(await userRepository.find());
   } catch (error) {
      next(error.message);
   }
};

export const deleteUserById = async (req, res, next) => {
   try {

      const { id } = req.params;

      const userRepository = DataSource.getRepository('User');
      
      const user = await userRepository.findOne({ id });
      if (!user) throw new Error(`The user with id: ${id} does not exist.`);

      await userRepository.remove({ id });

      res.status(200).json({ status: `Deleted user with id: ${id}.` });
   } catch (error) {
      next(error.message);
   }
};