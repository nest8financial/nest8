const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const companyName = req.body.companyName;
   const industry = req.body.industry;
   const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  console.log('In user router.  Posting user object req.body:', req.body);
  const queryText = `INSERT INTO "user" (first_name, last_name, company, industry_id, username, password)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [
      firstName,
      lastName,
      companyName,
      industry,
      email,
      password
    ])
    .then((dbResponse) => {
      console.log('User posted successfully in /api/user', dbResponse)
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500)
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
