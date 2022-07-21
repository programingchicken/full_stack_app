'use strict';
const User = require('./models').User
const express = require('express');
const auth = require('basic-auth');
const Course = require('./models').Course
const { asyncHandler } = require('./middleware/async-handler');
const {check, body, validationResult } = require("express-validator")
const bcryptjs = require('bcryptjs');
// This array is used to keep track of user records

/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */

 const courseAuth = asyncHandler(async(req, res, next) => {
    let message = null;
  
    // Get the user's credentials from the Authorization header.
    const credentials = auth(req);
  
    if (credentials) {
      // Look for a user whose `username` matches the credentials `name` property.
      const user = await User.findOne({ where: { emailAddress: credentials.name } })

      if (user) {

        const authenticated = bcryptjs
          .compareSync(credentials.pass, user.password);

        if (authenticated) {
            const course = await Course.findAll({ where: { userId: user.id } })
        
            if (course != null) {
                console.log(`Authentication successful for emailAddress: ${user.emailAddress}`);
                console.log(user.id)
                // Store the user on the Request object.
                req.currentUser = user;
                    } else {
                message = `Authentication failure on course for the user: ${user.emailAddress}`;
            }
        } else {
          message = `Authentication failure for emailAddress: ${user.emailAddress}`;
        }
      } else {
        message = `User not found for emailAddress: ${user.emailAddress}`;
      }
    } else {
      message = 'Auth header not found';
    }
  
    if (message) {
      console.warn(message);
      res.status(401).json({ message: 'Access Denied' });
    } else {
      next();
    }
  });


 const authenticateUser = asyncHandler(async(req, res, next) => {
    let message = null;
  
    // Get the user's credentials from the Authorization header.
    const credentials = auth(req);
  
    if (credentials) {
      // Look for a user whose `username` matches the credentials `name` property.
      const user = await User.findOne({ where: { emailAddress: credentials.name } })
      console.log(credentials)
      if (user) {
        const authenticated = bcryptjs
          .compareSync(credentials.pass, user.password);
        if (authenticated) {
          console.log(`Authentication successful for emailAddress: ${user.emailAddress}`);
  
          // Store the user on the Request object.
          req.currentUser = user;
        } else {
          message = `Authentication failure for emailAddress: ${user.emailAddress}`;
        }
      } else {
        message = `User not found for emailAddress: ${user.emailAddress}`;
      }
    } else {
      message = 'Auth header not found';
    }
  
    if (message) {
      console.warn(message);
      res.status(401).json({ message: 'Access Denied' });
    } else {
      next();
    }
  });

// Construct a router instance.
const router = express.Router();
 const validate = [
    body("title").notEmpty().withMessage('You need a title'),
    body("description").notEmpty().withMessage('You need a description')
]

//show all courses
router.get("/courses", asyncHandler(async (req, res, next) => {
    const courses = await Course.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "name",  "emailAddress"]
            }
        ]
    });
    if (courses.length !== 0) {
        res.status(200).json(courses).end();
    } else {
        console.log({ message: "Sorry, no courses found. :(" })
        res.status(404).json({error: 'no courses found'}).end();
    }
}));

//sellect a course
router.get("/course/:id", asyncHandler(async (req, res, next) => {
    const reqID = req.params.id

    const courses = await Course.findOne({
        where: { id: reqID },
    })
    console.log(courses)
        res.json(courses).end()
}));

//create a course
router.post("/course", [
    check('title')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "title"'),
    check('description')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "description"'),
    // check('estimatedTime')
    //   .exists({ checkNull: true, checkFalsy: true })
    //   .withMessage('Please provide a value for "Estimated Time"'),
    //   check('materialsNeeded')
    //   .exists({ checkNull: true, checkFalsy: true })
    //   .withMessage('Please provide a value for "Materials Needed"'),
  ], authenticateUser, asyncHandler(async (req, res, next) => {

    const errors = validationResult(req)


    if (!errors.isEmpty()) {
        const messageArray = errors.array().map((err) => err.msg)
        return res.status(400).json({ errors: messageArray })
    } else {
        const courses = await Course.create(req.body)
        const reqID = courses.id
        console.log('successfully created the course')
        res
            // .send('successfully created the course')
            .status(201)
            .location(`/courses/${reqID}`)
            .end()
    }

}));

//update a course
router.put("/course/:id", [
    check('title')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "title"'),
    check('description')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "description"'),
    // check('estimatedTime')
    //   .exists({ checkNull: true, checkFalsy: true })
    //   .withMessage('Please provide a value for "Estimated Time"'),
    //   check('materialsNeeded')
    //   .exists({ checkNull: true, checkFalsy: true })
    //   .withMessage('Please provide a value for "Materials Needed"'),
  ], courseAuth, asyncHandler(async (req, res, next) => {
            const reqID = req.params.id
            const course = await Course.findByPk(reqID)
            // await courses.update(req.body)
            if (course) {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    const messageArray = errors.array().map((err) => err.msg)
                    return res.status(400).json({ errors: messageArray })
                } else {
                    await Course.update(req.body, { where: { id: reqID } })
                    console.log('successfully updated course!')
                    res// .send('successfully updated course!')
                        .status(204)
                        .end()
                }
            } else {
                next(err)
            }
        }
    ));

//delete a course
router.delete("/course/:id", courseAuth, asyncHandler(async (req, res, next) => {
    const reqID = req.params.id
    const credentials = auth(req);
      const user = await User.findOne({ where: { emailAddress: credentials.name } })
      if (user) {
        const courses = await Course.destroy({ where: { id: reqID , userId: user.id} })
        if (courses) {
            console.log('successfully deleted the course!')
            res
                // .send('successfully deleted the course!')
                .status(204)
                .end()
        } else if (user || courses) {
        res
              // .send('didnt successfully deleted the course!')
              .status(401)
              .end()
        } else {
          next(err)
      }
      }
}));

// {
//     "title": "SQL and JavaScript",
//     "description": "JavaScript with Sequelize",
//     "estimatedTime": "40 hours",
//     "materialsNeeded": "JavaScript, ExpressJS, Sequelize",
//     "userId": 1
// }


// This array is used to keep track of user records
const users = [];

  //gets a user if authenticateded
router.get('/users', authenticateUser, asyncHandler(async(req, res) => {
    const credentials = auth(req);
    console.log(credentials)
    const user = await User.findOne({ where: { emailAddress: credentials.name } })
        res.json(user).end()

  }));



  

  // Route that creates a new user.
router.post('/users', [
    check('name')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "name"'),
    check('emailAddress')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "emailAddress"'),
    check('password')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "password"'),
  ], asyncHandler(async(req, res, next) => {
  // Attempt to get the validation result from the Request object.
  const user = req.body
  console.log(user)
  console.log(user)
    // Hash the new user's password.


    console.log(user.password)


  // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);

    // Return the validation errors to the client.
    return res.status(400).json({ errors: errorMessages });
  } else {


      // Get the user from the request body.
 const newUser = await User.create(req.body)

  // Add the user to the `users` array.
  // Set the status to 201 Created and end the response.
  res.status(201).end();

}

}));

  module.exports = router

// {
//     "name": "Gabe",
//     "username": "userGabe@mail.com",
//     "password": "P4ssword",
// }