const express = require("express")
const app = express()
const proxy = require("http-proxy-middleware")

const port = 3000

const datasetRouter = require("./routes/dataset")
const authRouter = require("./routes/auth")
const usersRouter = require("./routes/users")

const useUser = require("./middleware/useUser")

// A middleware that manages sessions.
const session = require('express-session')
const sessionOptions = {
  secret: "MKm*%Qd#gmTA8Gq}g|n#f5<Y@a+el7", // https://randomkeygen.com
  cookie: {},
  resave: false,
  saveUninitialized: true
}

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

const dotenv = require('dotenv')
dotenv.config()

// Load Passport
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile)
  }
);

passport.use(strategy)

app.use(session(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())
/*app.use(
  "/api",
  proxy({ target: "http://[::1]:8080", changeOrigin: true })
)*/

app.use("/api", authRouter)
app.use("/api", usersRouter)
app.use("/api/", datasetRouter)

app.use(useUser)

app.listen(port, () => console.log("Listening on port " + port))
