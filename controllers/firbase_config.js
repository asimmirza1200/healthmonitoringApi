const admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://healthmonitoring1200.firebaseio.com"
});


module.exports={
  admin
}