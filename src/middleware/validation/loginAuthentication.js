/*
 * The authentication validators
 */
import { body } from 'express-validator';

export default [
  body('email')
    .notEmpty()
    .withMessage('Username is een verplicht veld.')
    .bail()
    .withMessage('Username is niet juist.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Wachtwoord moet minstens 6 tekens bevatten.'),
];
