var express = require('express');
var nodemailer = require('nodemailer');
const info = require('../config');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: info['user'],
            pass: info['pass']
        }
    });
    
    var mailOptions = {
        from: info['from'],
        to: info['to'],
        subject: info['subject'],
        text: 'You have a new submissions with the following details: ' + req.body.name + ' Email ' + req.body.email + ' Message ' + req.body.message + '.',
        html: '<p>You have a new submissions with the following details:</p><ul><li>Name: ' + req.body.name + '</li><li>Email: '+ req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
    };
    
  transporter.sendMail(mailOptions, (err, info) => {
      if(err){
          console.log(err);
          res.redirect('/');
      } else {
          console.log('Message sent: ' + info);
          res.redirect('/');
      }
  })
});

module.exports = router;
