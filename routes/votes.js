const express = require('express');
const router = express.Router();

const Pusher = require('pusher');   

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: 'eu',
    encrypted: true
  });

router.get('/', (req, res) => {
    res.send('Votes');
});


router.post('/', (req, res) => {
    pusher.trigger('os-poll-channel', 'os-vote-event', {

        points: 1,
        os: req.body.os
      });

      return res.json({
          success: true,
          message: 'Thank you for voting'
      });
});

module.exports  = router;