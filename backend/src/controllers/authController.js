const user = require('../services/userService');
const auth = require('../services/authService');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');


exports.processLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    auth.authenticate(email, function(error, results) {
      if (error) {
        const message = 'Credentials are not valid.';
        return res.status(500).json({message: message});
      } else {
        if (results.length == 1) {
          if ((password == null) || (results[0] == null)) {
            return res.status(500).json({message: 'login failed'});
          }
          if (bcrypt.compareSync(password, results[0].user_password)) {
            const token = jwt.sign({id: results[0].user_id, role_name: results[0].role_name}, config.JWTKey, {
              expiresIn: 86400, // Expires in 24 hrs
            });
            const data = {
              user_id: results[0].user_id,
              role_name: results[0].role_name,
            }; // End of data variable setup

            res.cookie('cookie', token, {
              expires: dayjs().add(30, 'days').toDate(),
            });

            return res.status(200).json(data);
          } else {
            // return res.status(500).json({ message: 'Login has failed.' });
            return res.status(500).json({message: error});
          } // End of passowrd comparison with the retrieved decoded password.
        } // End of checking if there are returned SQL results
      }
    });
  } catch (error) {
    return res.status(500).json({message: error});
  } // end of try
};

exports.processRegister = (req, res, next) => {
  console.log('processRegister running.');
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;


  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log('Error on hashing password');
      return res.status(500).json({statusMessage: 'Unable to complete registration'});
    } else {
      results = user.createUser(fullName, email, hash, function(results, error) {
        if (results!=null) {
          console.log(results);
          return res.status(200).json({statusMessage: 'Completed registration.'});
        }
        if (error) {
          console.log('processRegister method : callback error block section is running.');
          console.log(error, '==================================================================');
          return res.status(500).json({statusMessage: 'Unable to complete registration'});
        }
      });// End of anonymous callback function
    }
  });
}; // End of processRegister

exports.logout = (req, res) => {
  res.cookie('cookie', 'loggedOut', {
    expires: dayjs().add(30, 'days').toDate(),
  });
  return res.status(200).end();
};
