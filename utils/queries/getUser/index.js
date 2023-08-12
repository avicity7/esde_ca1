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
        var proj_expr = "user_id, email, fullname, role_id"
        await dynamodbQuery(region, table_name,expr_attr_values,key_cond_expr,proj_expr)
        .then(async(data) => {
                    console.log("Successfully got items from dynamodb.query")
                    console.log(data)
                    var userResult = {'data': data.Items[0]}
                    var region = "us-east-1"
                    var table_name = "test"
                    var expr_attr_values = { ":role_id": data.role_id }
                    var key_cond_expr = "role_id=:role_id"
                    var proj_expr = "role_id, role_name"
                    await dynamodbQuery(region, table_name,expr_attr_values,key_cond_expr,proj_expr)
                    .then(roleData => {
                        var responseCode = 200;
                        let result = {'userdata': {
                            'email': userResult.email, 
                            'fullname':userResult.fullname,
                            'role_id': userResult.role_id,
                            'role_name': roleData.Items[0].role_name,
                            'user_id': userResult.user_id
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
             
             
    } //end if
        
    
    
}
