const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 3000;
// app.use(express.static(__dirname + '/public'));
const { MongoClient } = require("mongodb");

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
var uri =
  "mongodb+srv://27107:27107@<your-cluster-url>/test?retryWrites=true&w=majority";
uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000"; //&appName=mongosh+1.6.2"
// Now that we have our URI, we can create an instance of MongoClient.

var outsideResult = "";
//making change to see if github dekstop works from Mac

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  result = databasesList.databases.map((db) => ` - ${db.name}`);
  outsideResult = result;
  return result;
  // console.log()
}
//change made to test mac connection to github
convertURLtoJSON = (url) => {
  obj = {};
  url.split("&").forEach((e) => {
    [k, v] = e.split("=");
    obj[k] = v;
  });
  return JSON.stringify(obj);
};

const client = new MongoClient(uri);
client.connect();

app.get("/", (req, res) => {
  res.sendfile(__dirname + "/index.html");
  
    // var dbo = db.db("myshinynewdb");

  // request = req.url.substring(req.url.indexOf("?") + 1);
  // console.log(`request = ${convertURLtoJSON(request)}`);
  // var dbs = listDatabases(client);
  // res.send(outsideResult);
});

app.get("/mongoRequest", (req, res) => {
  request = req.url.substring(req.url.indexOf("?") + 1);
  console.log(`mongoRequest = ${convertURLtoJSON(request)}`);
  var dbs = listDatabases(client);
  console.log(outsideResult)
  client.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = client.db("myshinynewdb");
    var myobj = { name: "Fersh Avacoda Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  res.send(outsideResult);
});



const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
require('dotenv').config();


// Passport initialization and configuration
app.use(passport.initialize());

// Google authentication strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Handle Google authentication logic here
  // Save the user to the database if necessary
  done(null, profile);
}));

// Facebook authentication strategy
passport.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
  // Handle Facebook authentication logic here
  // Save the user to the database if necessary
  done(null, profile);
}));

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // Redirect or send response after successful authentication
  res.send('Authenticated with Google!');
});

app.post('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  // Redirect or send response after successful authentication
  res.send('Authenticated with Facebook!');
});

// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Failed to connect to MongoDB', err);
//   process.exit(1);
// });

const sse = new EventSource("public/index.html");

/*asldfkajfsadf asdf
 * This will listen only for events
 * similar to the following:
 *
 * event: notice
 * data: useful data
 * id: someid
 */
sse.addEventListener("notice", (e) => {
  console.log(e.data);
});

/*
 * Similarly, this will listen for events
 * with the field `event: update`
 */
sse.addEventListener("update", (e) => {
  console.log(e.data);
});

/*
 * The event "message" is a special case, as it
 * will capture events without an event field
 * as well as events that have the specific type
 * `event: message` It will not trigger on any
 * other event type.
 */
sse.addEventListener("message", (e) => {
  console.log(e.data);
});
