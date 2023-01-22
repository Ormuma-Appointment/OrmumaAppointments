const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.addAdminRole = functions.https.onRequest((req, res) => {
  // Automatically allow cross-origin requests
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(401).json({
        message: "Not allowed",
      });
    }
    // Your Cloud Function code here
    const data = req.body;
    if (!data.email) {
      return res.status(401).json({
        message: "Email is required",
      });
    }
    return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, { admin: true });
      })
      .then(() => {
        return res
          .status(200)
          .json({ message: `Success! ${data.email} has been made an admin` });
      })
      .catch((err) => {
        return res.status(401).json({ message: err });
      });
  });
});
