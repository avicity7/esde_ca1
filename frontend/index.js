const https = require('https');
const fs = require('fs');

const express=require('express');
const serveStatic=require('serve-static');
const port=3001;


const app=express();


app.use(function(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.path);
  console.log(req.query.id);
  // Checking the incoming request type from the client
  if (req.method!='GET') {
    res.type('.html');
    const msg='<html><body>This server only serves web pages with GET request</body></html>';
    res.end(msg);
  } else {
    next();
  }
});


app.use(serveStatic(__dirname+'/public'));


app.get('/', (req, res) => {
  res.sendFile('/public/home.html', {root: __dirname});
});
// https
//     .createServer(
//         {
//           key: fs.readFileSync('./key.pem', 'utf-8'),
//           cert: fs.readFileSync('./cert.pem', 'utf-8'),
//         },
//         app)
//     .listen(port, ()=>{
//       console.log(`server is runing at port ${port}`);
//     });

app.listen(port, () => {
  console.log('Server hosted at Localhost port 5000');
});


