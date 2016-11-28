var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var engine = require('consolidate');
var mailer = require('express-mailer');
app.use(session({
	secret:'somesecrettokenhere',
	resave: false,
	saveUninitialized: true,
	maxAge: 5000000
}));
mailer.extend(app, {
  from: 'vendiostoreonline@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'vendiostoreonline@gmail.com',
    pass: 'codingdojo'
  }
});
app.engine('html', engine.mustache);
app.set('views',__dirname + '/client')
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use(express.static(path.join(__dirname, 'client')));
require(path.join(__dirname, 'server', 'config', 'mongoose.js'));
require(path.join(__dirname, 'server', 'config', 'routes.js'))(app);
app.listen(8000, function() {
	console.log('listening on 8000')
});

