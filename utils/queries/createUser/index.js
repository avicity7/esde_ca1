var AWS = require('aws-sdk');

const generateUUIDNumber = () => {
  input = AWS.util.uuid.v4()
  output = ""
  for (let i = 0; i < input.length; i++) {
    if (parseInt(input[i])) {
      output += input[i]
    } else {
      output += input[i].charCodeAt(0).toString()
    }
  }
  return output.slice(0,24)
}

exports.handler = async function(event, context, callback){
    if ((event.fullname && event.email && event.password) || (event.queryStringParameters && event.queryStringParameters.fullname && event.queryStringParameters.email && event.queryStringParameters.passsword)) {
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
          'user_id': {N: await generateUUIDNumber()},
          'fullname': {S: fullname}, 
          'email': {S: email},
          'role_id': {S: "2"},
          'user_password': {S: password}
        }
      }

      try {
        const data = await ddb.putItem(params).promise()
        if (data) {
          let response = {
            statusCode: 200,
            body: JSON.stringify({result: "Item added sucessfully"}),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type,user",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
          }
          console.log("response: " + JSON.stringify(response))
          callback(null, response);
        }
      } catch(err) {
        console.log(err)
        var responseCode = 500;

        let response = {
            statusCode: responseCode,
            body: JSON.stringify(err)
        }

        console.log("response: " + JSON.stringify(response))
        callback(null, response);
      }
      
    }
}
