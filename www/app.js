'use strict';
var express = require('express'),
		bodyParser = require('body-parser'),
		Realm	= require('realm'),
		paths	= require('path'),
		mongoose = require('mongoose'),
		nodemailer = require('nodemailer'),
		mg = require('nodemailer-mailgun-transport'),
		nconf = require('nconf'),
		auth = require('./config.json'),
		ejs	= require('ejs');

const routes	 		 = require('./routes/index');
const MongoClient	 = require('mongodb').MongoClient;

var app 			 = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'));


app.use("/public", express.static(__dirname + '/public'));

app.use("/css", express.static(paths.join(__dirname + '/css')));

app.use("/img", express.static(__dirname + '/img'));

app.use("/vendor", express.static(__dirname + '/vendor'));


app.set('view engine', 'ejs');
app.set('views', paths.join(__dirname, 'views'));


app.get('/about', function(req, res) {
	res.render('about.ejs');
});

app.get('/write', function(req, res) {
	res.render("write.ejs");
});

app.get('/edit', function(req, res) {
	res.render('edit.ejs');
});

app.get('/contact', function(req, res) {
	res.render('contact.ejs');
})


app.get('/post', function(req, res) {
	var cursor = db.collection('Posts').find();
	db.collection('Posts').find().toArray((err, result) =>{
		if (err) return console.log(err)

		res.render('post.ejs', {Posts: result})	
	})
});


var db;

// post request to the route
app.post('/write', function(req, res) {
	db.collection('Posts').save(req.body, function(err, result) {
		if(err) return console.log(err);
		console.log('saved to database');
		res.send('Successfully inserted!');
		//res.redirect('/');
	})
})

// get request to the route
app.get('/', function(req, res) {
	var cursor = db.collection('Posts').find();
	db.collection('Posts').find().toArray((err, result) =>{
		if (err) return console.log(err)

		res.render('../views/blog.ejs', {Posts: result})	
	})

});

// update request to the route
app.put('/edit', function(req, res) {
	const updates = {
		title: req.body.title,
		content: req.body.content
	};

	db.collection('Posts').findOneAndUpdate({_id: req.user.id }, {		
		$set: { updates }
	}, {
		sort: {_id: -1},
		upsert: true,
		returnNewDocument: true
	}, function(err, result) {
		if (err) return res.send(err);
			res.send(result);
			console.log('edited and saved to database');
			res.redirect('/');
	});
}
// .then(res =>{
// 	if(res.ok) return res.json();
// })
// .then(function(data) {
// 	console.log(data);
// })
);

// handle contact posts
app.post('/contact', function(req, res) {
	var name 		= req.body.name;
	var email 	= req.body.email;
	//var company = req.body.company;
	var phone		= req.body.phone;
	var message = req.body.message;
	var isError = false;

	//create transporter object capable of sending mails via SMTP
	var transporter = nodemailer.createTransport(mg(auth));

	//set up email data with unicode symbols
	var mailOptions = {
		from: "'ElitePath Software Ltd'<email@domain.org>", // sender
		to:'email@domain.com',
		subject: 'Message From elitePath',
		text: message,
		err: isError 
	};
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info) {
		if(error) {
			console.log('\nERROR: ' + error+'\n');	
		} else {
				console.log('\nRESPONSE SENT: ' + info.response+'\n');
		}
	});
});



// database connection with mlabs
MongoClient.connect('dbconn', (err, database) => {
      // ... start the server
      if (err) return console.log(err);
      db = database;

      app.listen(3000, function() {
				console.log("server started...")
			});
    });

