const userManager = require('../services/userService');
const fileDataManager = require('../services/fileService');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

//
exports.processDesignSubmission = (req, res, next) => {
  const designTitle = req.body.designTitle;
  const designDescription = req.body.designDescription;
  const userId = req.body.userId;
  const file = req.body.file;
  fileDataManager.uploadFile(file, async function(error, result) {
    console.log('check result variable in fileDataManager.upload code block\n', result);
    console.log('check error variable in fileDataManager.upload code block\n', error);
    const uploadResult = result;
    if (error) {
      const message = 'Unable to complete file submission.';
      res.status(500).json({message: message});
      res.end();
    } else {
      // Update the file table inside the MySQL when the file image
      // has been saved at the cloud storage (Cloudinary)
      const imageURL = uploadResult.imageURL;
      const publicId = uploadResult.publicId;
      console.log('check uploadResult before calling createFileData in try block', uploadResult);
      try {
        const result = await fileDataManager.createFileData(imageURL, publicId, userId, designTitle, designDescription);
        console.log('Inspert result variable inside fileDataManager.uploadFile code');
        console.log(result);
        if (result) {
          const message = 'File submission completed.';
          res.status(200).json({message: message, imageURL: imageURL});
        }
      } catch (error) {
        const message = 'File submission failed.';
        res.status(500).json({
          message: message,
        });
      }
    }
  });
}; // End of processDesignSubmission
exports.processGetSubmissionData = async (req, res, next) => {
  const pageNumber = req.params.pagenumber;
  const search = req.params.search;
  const userId = req.body.userId;
  try {
    const results = await fileDataManager.getFileData(userId, pageNumber, search);
    console.log('Inspect result variable inside processGetSubmissionData code\n', results);
    if (results) {
      const jsonResult = {
        'number_of_records': results[0].length,
        'page_number': pageNumber,
        'filedata': results[0],
        'total_number_of_records': results[2][0].total_records,
      };
      return res.status(200).json(jsonResult);
    }
  } catch (error) {
    const message = 'Server is unable to process your request.';
    return res.status(500).json({
      message: message,
    });
  }
}; // End of processGetSubmissionData
exports.processGetSubmissionsbyEmail = async (req, res, next) => {
  const pageNumber = req.params.pagenumber;
  const search = req.params.search;
  const userId = req.body.userId;
  try {
    // Need to search and get the id information from the database
    // first. The getOneuserData method accepts the userId to do the search.
    const userData = await userManager.getOneUserDataByEmail(search);
    console.log('Results in userData after calling getOneUserDataByEmail');
    console.log(userData);
    if (userData) {
      const results = await fileDataManager.getFileDataByUserId(userData[0].user_id, pageNumber);
      console.log('Inspect result variable inside processGetSubmissionsbyEmail code\n', results);
      if (results) {
        const jsonResult = {
          'number_of_records': results[0].length,
          'page_number': pageNumber,
          'filedata': results[0],
          'total_number_of_records': results[2][0].total_records,
        };
        return res.status(200).json(jsonResult);
      }// Check if there is any submission record found inside the file table
    }// Check if there is any matching user record after searching by email
  } catch (error) {
    const message = 'Server is unable to process your request.';
    return res.status(500).json({
      message: message,
    });
  }
}; // End of processGetSubmissionsbyEmail

exports.processGetUserData = async (req, res, next) => {
  const pageNumber = req.params.pagenumber;
  const search = req.params.search;

  try {
    const results = await userManager.getUserData(pageNumber, search);
    console.log('Inspect result variable inside processGetUserData code\n', results);
    if (results) {
      const jsonResult = {
        'number_of_records': results[0].length,
        'page_number': pageNumber,
        'userdata': results[0],
        'total_number_of_records': results[2][0].total_records,
      };
      return res.status(200).json(jsonResult);
    }
  } catch (error) {
    const message = 'Server is unable to process your request.';
    return res.status(500).json({
      message: message,
    });
  }
}; // End of processGetUserData

exports.processGetOneUserData = async (req, res, next) => {
  const recordId = req.params.recordId;

  try {
    const results = await userManager.getOneUserData(recordId);
    console.log('Inspect result variable inside processGetOneUserData code\n', results);
    if (results) {
      const jsonResult = {
        'userdata': results[0],
      };
      return res.status(200).json(jsonResult);
    }
  } catch (error) {
    const message = 'Server is unable to process your request.';
    return res.status(500).json({
      message: message,
    });
  }
}; // End of processGetOneUserData


exports.processUpdateOneUser = async (req, res, next) => {
  console.log('processUpdateOneUser running');
  // Collect data from the request body
  const recordId = req.body.recordId;
  const newRoleId = req.body.roleId;
  try {
    results = await userManager.updateUser(recordId, newRoleId);
    console.log(results);
    return res.status(200).json({message: 'Completed update'});
  } catch (error) {
    console.log('processUpdateOneUser method : catch block section code is running');
    console.log(error, '=======================================================================');
    return res.status(500).json({message: 'Unable to complete update operation'});
  }
}; // End of processUpdateOneUser

exports.processGetOneDesignData = async (req, res, next) => {
  const recordId = req.params.fileId;

  try {
    const results = await userManager.getOneDesignData(recordId);
    console.log('Inspect result variable inside processGetOneFileData code\n', results);
    console.log(req.headers);
    const authHeader = req.headers['Authorization'];
    if (typeof authHeader !== 'undefined') {
      // Retrieve the authorization header and parse out the
      // JWT using the split function
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7, authHeader.length);
      } else {
        // Error
      }
      console.log(token);
      // console.log('Check for received token from frontend : \n');
      // console.log(token);
      jwt.verify(token, config.JWTKey, (err, data) => {
        console.log('data extracted from token \n', data);
        if (err) {
          console.log(err);
          return res.status(403).send({message: 'Unauthorized access'});
        } else {
          if (results && data.id == results[0].created_by_id) {
            console.log(results);
            const jsonResult = {
              'filedata': results[0],
            };
            return res.status(200).json(jsonResult);
          } else {
            return res.status(403).send({message: 'Unauthorized access'});
          }
        }
      });
    } else {
      res.status(403).send({message: 'Unauthorized access'});
    }
  } catch (error) {
    const message = 'Server is unable to process the request.';
    return res.status(500).json({
      message: message,
    });
  }
}; // End of processGetOneDesignData

exports.processSendInvitation = async (req, res, next) => {
  const userId = req.body.userId;
  const recipientEmail = req.body.recipientEmail;
  const recipientName = req.body.recipientName;
  console.log('userController processSendInvitation method\'s received values');
  console.log(userId);
  console.log(recipientEmail);
  console.log(recipientName);

  try {
    // Need to search and get the user's email information from the database
    // first. The getOneuserData method accepts the userId to do the search.
    const userData = await userManager.getOneUserData(userId);
    console.log(userData);
    const results = await userManager.createOneEmailInvitation(userData[0], recipientName, recipientEmail);
    if (results) {
      const jsonResult = {
        result: 'Email invitation has been sent to ' + recipientEmail + ' ',
      };
      return res.status(200).json(jsonResult);
    }
  } catch (error) {
    console.log(error);
    const message = 'Server is unable to process the request.';
    return res.status(500).json({
      message: message,
      error: error,
    });
  }
}; // End of processSendInvitation


exports.processUpdateOneDesign = async (req, res, next) => {
  console.log('processUpdateOneFile running');
  // Collect data from the request body
  const fileId = req.body.fileId;
  const designTitle = req.body.designTitle;
  const designDescription = req.body.designDescription;
  try {
    results = await userManager.updateDesign(fileId, designTitle, designDescription);
    console.log(results);
    return res.status(200).json({message: 'Completed update'});
  } catch (error) {
    console.log('processUpdateOneUser method : catch block section code is running');
    console.log(error, '=======================================================================');
    return res.status(500).json({message: 'Unable to complete update operation'});
  }
}; // End of processUpdateOneDesign
