const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.API_PORT;
const devDB = process.env.DEVELOPMENT_DB //will connect to mongodb://localhost/data-by-design
const testDb = process.env.TEST_DB
const prodDb = process.env.PRODUCTION_DB

if (!port) {
  console.error("The PORT environmental variable isn't set! Have you made a .env file? (run the command [npm run generate:env] to automatically create one)");
}

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'test';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'data-by-design', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
let db = ""
if (!isProduction)
  db = 'mongodb://localhost/' + (isTesting ? testDb : devDB);
else {
  const username = process.env.PROD_USER;
  const password = process.env.PROD_PASSWORD;
  db = `mongodb://${username}:${password}@localhost/${prodDb}`;
}
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

//Models & routes
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

module.exports = app.listen(port, () => console.log('Server running on port ' + port));
