const express = require('express');
const router = express.Router();

const Pusher = require('pusher');   

const pusher = new Pusher({
    appId: '993344',
    key: '75b4c72486252e9f6648',
    secret: 'edec131003188dfb7965',
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