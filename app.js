const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');
const app = express();

const VAPID_PUBLIC = 'BFFNIqiLfQXkEKRkcFYPK3Szmc__zt7n1uQnH_y24rcr6vCJ08ChDmQEoVTtMJNTlgjDwkC6-eCX578vpYm3J5g';
const VAPID_PRIVATE = 'Gtx2qf0RAE6wpxarCB4P-jxURN-ldb3VJoJ8gH8M_M0';

let subscription;

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  VAPID_PUBLIC,
  VAPID_PRIVATE
);

app.use(bodyParser.json());
app.use(cors());

app.post('/register-push-device', (req, res) => {
  console.log('saving subscription');
  subscription = req.body.subscription;
  res.end();
});

app.get('/send-notification', (req, res) => {
  console.log('sending notification');
  webpush.sendNotification(subscription, 'Hello, welcome to YouComment, please sign in or go to search page!').catch((ex) => {
    console.log(ex);
  });
  res.end();
});

const port = process.env.PORT || 9999;
app.listen(port, function() {
  console.log("starting at " + port);
})