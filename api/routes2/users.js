'use strict';
const User = require('../models').User
const express = require('express');
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');
const { check, validationResult } = require('express-validator/check');

// This array is used to keep track of user records
const users = [];
// Construct a router instance.
const router = express.Router();

  //gets a user if authenticateded
router.get('/', authenticateUser, asyncHandler(async(req, res) => {
    const user = req.currentUser
        res.json(user).status(200).end();
  }));



  

  // Route that creates a new user.
router.post('/', [
  check('name')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "name"'),
  check('username')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "username"'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "password"'),
], asyncHandler(async(req, res) => {
  // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);

    // Return the validation errors to the client.
    return res.status(400).json({ errors: errorMessages });
  }

  // Get the user from the request body.
  const user = await User.create(req.body)

  // Hash the new user's password.
  user.password = bcryptjs.hashSync(user.password);

  // Add the user to the `users` array.
  users.push(user);

  // Set the status to 201 Created and end the response.
  return res.status(201).end();
}));

  module.exports = router

// {
//     "name": "Gabe",
//     "username": "userGabe@mail.com",
//     "password": "P4ssword",
// }