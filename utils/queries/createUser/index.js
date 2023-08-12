var AWS = require('aws-sdk');

const putItem = async(ddb, params, callback) => {
  ddb.putItem(params, function(err, data) {
    console.log('putItem finished')
    if (err) {
      console.log('There has been a problem with your fetch operation: ' + err.message);
      var responseCode = 500;

      let response = {
          statusCode: responseCode,
          body: JSON.stringify(err)
      }

      console.log("response: " + JSON.stringify(response))
      callback(null, response);
    } else {
      console.log('success')
      let response = {
        statusCode: 200,
        body: JSON.stringify({"result": "Item added successfully"}),
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type,user",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
      }
      console.log("response: " + JSON.stringify(response))
      callback(null, response);
    }
  });
}

exports.handler = async function(event, context, callback){
    if ((event.fullname && event.email && event.password) || (event.queryStringParameters && event.queryStringParameters.fullname && event.queryStringParameters.email && event.queryStringParameters.passsword)) {
      console.log("here")
      if (event.fullname && event.email && event.password) {
          var fullname = event.fullname;
          var email = event.email; 
          var password = event.password;
      } else {
        var fullname = event.queryStringParameters.fullname;
        var email = event.queryStringParameters.email;
        var password = event.queryStringParameters.password;
      }
      AWS.config.update({region: 'us-east-1'});
      var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
      var params = {
        TableName: 'users',
        Item: {
          'user_id': {N: AWS.util.uuid.v4()},
          'fullname': {S: fullname}, 
          'email': {S: email},
          'role_id': {S: "2"},
          'user_password': {S: password}
        }
      }
      await putItem(ddb, params, callback)
    }
}
