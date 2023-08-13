const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const formData = require('express-form-data');
var cookieParser = require('cookie-parser');
// const dummyUserFn = require('./src/middlewares/dummyUserFn');

const app = express();


var morgan = require('morgan');
var fs = require('fs');
var util = require('util');
const path = require('path');
var logFile = fs.createWriteStream(__dirname + '/debug.log', {flags: 'w'});
var logStdout = process.stdout;

console.log = function(d) { //
  logFile.write(util.format(d) + '\n');
  logStdout.write(util.format(d) + '\n');
};

app.use(morgan('combined', {
  stream: logFile,
}));

app.use(morgan('combined'));
app.use(cookieParser());
app.use("*", cors());

// Server Settings
const PORT = 5000;
const bodyParser = require('body-parser');
const bootstrap = require('./src/bootstrap');

// https://github.com/ortexx/express-form-data#readme


// Parse data with connect-multiparty.
app.use(formData.parse({}));
// Delete from the request all empty files (size == 0)
app.use(formData.format());
// Change the file objects to fs.ReadStream
app.use(formData.stream());
// Union the body and the files
app.use(formData.union());

// Pug Template Engine
app.set('view engine', 'pug');
app.set('views', path.resolve('./src/views'));

// Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Not using the following because the client side will be using
// formdata technique to send data. This is due to the web application
// has file submission functionality.
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Express Router
const router = express.Router();
app.use(router);
const rootPath = path.resolve('./dist');

// All client side files are parked inside the dist directory.
// The client side files are compiled by using Gulp
// The actual code files which developers edit is at /src/assets
app.use(express.static(rootPath));
// Applied this middleware function to supply dummy user id for testing
// when I have not prepared the login functionality.
// router.use(dummyUserFn.useDummyUserForTesting);
bootstrap(app, router);

app.listen(PORT, (err) => {
  if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
  console.log(`Server is Listening on: http://localhost:${PORT}/`);
});
