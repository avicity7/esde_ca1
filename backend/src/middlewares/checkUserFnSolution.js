const config = require('../config/config');
const jwt = require('jsonwebtoken');
module.exports.checkForValidUserRoleUser = (req, res, next) => {
  // If the token is valid, the logic extracts the user id and the role information.
  // If the role is not user, then response 403 UnAuthorized
  // The user id information is inserted into the request.body.userId
  console.log('http header - user ', req.headers['user']);
  if (typeof req.cookies.cookie !== 'undefined') {
    // Retrieve the authorization header and parse out the
    // JWT using the split function
    const token = req.cookies.cookie.replace(/['"]+/g, '');
    // console.log('Check for received token from frontend : \n');
    // console.log(token);
    jwt.verify(token, config.JWTKey, (err, data) => {
      console.log('data extracted from token \n', data);
      if (err) {
        console.log(err);
        return res.status(403).send({message: 'Unauthorized access'});
      } else {
        if (data.role_name != 'admin') {
          return res.status(403).send({message: 'Unauthorized access'});
        }
        req.body.userId = data.id;
        next();
      }
    });
  } else {
    res.status(403).send({message: 'Unauthorized access'});
  }
}; // End of checkForValidUserRoleUser

module.exports.checkForPageAccess = (req, res, next) => {
  // If the token is valid, the logic extracts the user id and the role information.
  // If the role is not user, then response 403 UnAuthorized
  // The user id information is inserted into the request.body.userId
  console.log('http header - user ', req.headers['user']);
  if (typeof req.cookies.cookie !== 'undefined') {
    // Retrieve the authorization header and parse out the
    // JWT using the split function
    const token = req.cookies.cookie;
    // console.log('Check for received token from frontend : \n');
    // console.log(token);
    jwt.verify(token, config.JWTKey, (err, data) => {
      console.log('data extracted from token \n', data);
      if (err) {
        console.log(err);
        return res.status(200).send({message: 'Unauthorized'});
      } else {
        if (data.role_name != 'admin') {
          return res.status(200).send({message: 'Unauthorized'});
        }
        return res.status(200);
      }
    });
  } else {
    res.status(200).send({message: 'Unauthorized'});
  }
};
