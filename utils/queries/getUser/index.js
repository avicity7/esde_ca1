var dynamodbQuery = require('dynamodb');

exports.handler = async function(event, context, callback){
    if (event.user_id || (event.queryStringParameters && event.queryStringParameters.user_id)) {
        if (event.user_id)
            var user_id = parseInt(event.user_id);
        else
            var user_id= parseInt(event.queryStringParameters.user_id);
        var region = "us-east-1"
        var table_name = "users"
        var expr_attr_values = { ":user_id": user_id }
        var key_cond_expr = "user_id=:user_id"
        var proj_expr = "user_id, email, fullname, role_id, user_password"
        await dynamodbQuery(region, table_name,expr_attr_values,key_cond_expr,proj_expr)
        .then(data => {
                    console.log("Successfully got items from dynamodb.query")
                    var responseCode = 200;
                    var jsonResult = {'data': data.Items[0]}
                    let response = {
                            statusCode: responseCode,
                            body: JSON.stringify(jsonResult),
                            headers: {
                                "Access-Control-Allow-Headers" : "Content-Type,user",
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                            }
                    }
                    console.log("response: " + JSON.stringify(response))
                    callback(null, response);
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
             
             
    } //end if
        
    
    
}
