const express = require("express");
const app = express();
const port = 9010;
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

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  result = databasesList.databases.map((db) => ` - ${db.name}`);
  outsideResult = result;
  return result;
  // console.log()
}

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
  var dbo = db.db("myshinynewdb");

  request = req.url.substring(req.url.indexOf("?") + 1);
  console.log(`request = ${convertURLtoJSON(request)}`);
  var dbs = listDatabases(client);
  res.send(outsideResult);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
