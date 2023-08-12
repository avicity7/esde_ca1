var AWS = require('aws-sdk');
var bcrypt = require('./bcrypt.js-master/dist/bcrypt')
var dynamodbQuery = require('dynamodb');

exports.handler = async function(event, context, callback){
    if ((event.email && event.password) || (event.queryStringParameters && event.queryStringParameters.email && event.queryStringParameters.passsword)) {
      if (event.email && event.password) {
          var email = event.email; 
          var password = event.password;
      } else {
        var email = event.queryStringParameters.email;
        var password = event.queryStringParameters.password;
      }

      var region = "us-east-1"
      var expr_attr_values = { ":email": email }
      var key_cond_expr = "email=:email"
      var proj_expr = "user_id, email, fullname, role_id, user_password"
      var params = {  
        TableName: "users", 
        IndexName: "email-index",
        ExpressionAttributeValues: expr_attr_values,
        KeyConditionExpression: key_cond_expr ,
        ProjectionExpression: proj_expr
      } 
      var dynamodb = new AWS.DynamoDB.DocumentClient({region: region});
      await dynamodb.query(params).promise()
        .then(async(data) => {
          console.log("Successfully got items from dynamodb.query")
          var userResult = {'data': data.Items[0]}
          var expr_attr_values = { ":role_id": String(userResult.data.role_id) }
          var key_cond_expr = "role_id=:role_id"
          var proj_expr = "role_id, role_name"

          var params = {  
            TableName: "test", 
            ExpressionAttributeValues: expr_attr_values,
            KeyConditionExpression: key_cond_expr ,
            ProjectionExpression: proj_expr
          } 

          await dynamodb.query(params).promise()
          .then(roleData => {
              console.log(roleData)
              if (bcrypt.compareSync(password, userResult.data.user_password)) {
                var responseCode = 200;
                let result = {'userdata': {
                    'email': userResult.data.email, 
                    'fullname':userResult.data.fullname,
                    'role_id': userResult.data.role_id,
                    'role_name': roleData.Items[0].role_name,
                    'user_id': userResult.data.user_id
                }}
                let response = {
                  statusCode: responseCode,
                  body: JSON.stringify(result),
                  headers: {
                      "Access-Control-Allow-Headers" : "Content-Type,user",
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                  }
                }
                console.log("response: " + JSON.stringify(response))
                callback(null, response);
              } else {
                let result = {"message": "Login has failed"}
                let response = {
                  statusCode: 200,
                  body: JSON.stringify(result),
                  headers: {
                    "Access-Control-Allow-Headers" : "Content-Type,user",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                  }
                }
                console.log("response: " + JSON.stringify(response))
                callback(null, response);
              }
          })
        })
        .catch(error => {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          var responseCode = 500;

          let response = {
              statusCode: responseCode,
              body: JSON.stringify(error)
          }
  
          console.log("response: " + JSON.stringify(response))
          callback(null, response);
        });
      
    }
}
