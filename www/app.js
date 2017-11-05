'use strict';
var express 	 = require('express'),
		bodyParser = require('body-parser'),
		Realm			 = require('realm'),
		paths			 = require('path'),
		mongoose	 = require('mongoose');

const routes	 		 = require('./routes/index');
const MongoClient	 = require('mongodb').MongoClient;

//var		Postschema 	 = require('./models/Post');

var app 			 = express();

let PostSchema = {
	name: 'Post',
	properties: {
		timestamp: 'date',
		title:'string',
		content: 'string'
	}
}

var blogRealm = new Realm({
	path:'blog.realm',
	schema: [PostSchema]
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'));

app.use("/public", express.static(__dirname + 'public'));

app.use("/css", express.static(__dirname + '/css'));

app.use("/img", express.static(__dirname + '/img'));

app.use("/vendor", express.static(__dirname + '/vendor'));


app.set('view engine', 'ejs');
app.set('views', paths.join(__dirname, 'views'));

// app.get('/', function(req, res) {
// 	let posts = blogRealm.objects('Post').sorted('timestamp', true);
// 	res.render('../views/blog.ejs', {posts: posts});
// });



app.get('/about', function(req, res) {
	res.render('about.ejs');
});

app.get('/write', function(req, res) {
	res.sendFile(__dirname + "/write.html");
});

app.get('/home', function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get('/post', function(req, res) {
	res.sendFile(__dirname + "/post.html");
});


// app.post('/write', function(req, res) {
// 	let title 	= req.body['title'],
// 			content = req.body['content'],
// 			timestamp = new Date();

// 	blogRealm.write(() => {
// 		blogRealm.create('Post', {title: title, content: content, timestamp: timestamp});
// 	});	

// 	res.sendFile(__dirname + "/write-complete.html");
// });
var db;

app.post('/write', function(req, res) {
	db.collection('Posts').save(req.body, function(err, result) {
		if(err) return console.log(err);

		console.log('saved to database')
		res.redirect('/');
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
app.put('/Posts', function(req, res) {

	db.collection('Posts').findOneAndUpdate({title: 'Social Marketing for Developers'}, {
		$set: {
			title: req.body.title,
			author: req.body.author,
			content: req.body.content

		}
	}, {
		sort: {_id: -1},
		upsert: true
	}, function(err, result) {
		if (err) return res.send(err);
			res.send(result);
	});
}
// .then(res =>{
// 	if(res.ok) return res.json();
// })
// .then(function(data) {
// 	console.log(data);
// })
);

// database connection with mlabs
MongoClient.connect('mongodb://blog-elitepath:blog-elitepath@ds243325.mlab.com:43325/blog-elitepath', (err, database) => {
      // ... start the server
      if (err) return console.log(err);
      db = database;

      app.listen(3000, function() {
				console.log("server started...")
			});
    });

