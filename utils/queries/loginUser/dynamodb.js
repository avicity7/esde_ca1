var AWS = require('aws-sdk');

async function queryitems_dynamodb(region, table_name,expr_attr_values,key_cond_expr,proj_expr,index) {
    console.log("In the queryitems_dynamodb method...")
    var dynamodb = new AWS.DynamoDB.DocumentClient({region: region});

    try{

        var params = {  
            TableName: table_name, 
            IndexName: "email-index",
            ExpressionAttributeValues: expr_attr_values,
            KeyConditionExpression: key_cond_expr ,
            ProjectionExpression: proj_expr
        } 
        
        const results = await dynamodb.query(params).promise()
        console.log("Printing results from  queryitems_dynamodb " + results)
        return results;
       
        
    }
    catch(tryerror) {
        console.log("Error occurred in dynamodb.query..")
        console.log(tryerror, tryerror.stack); // an error occurred
    }
} //end function


module.exports = queryitems_dynamodb