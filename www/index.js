'use strict';
var express 	 = require('express'),
		bodyParser = require('body-parser'),
		Realm			 = require('realm'),
		paths			 = require('path'),
		mongoose	 = require('mongoose');

const routes	 		 = require('./routes/index');
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


app.use(bodyParser.urlencoded({extended: true}))

app.use("/public", express.static(__dirname + 'public'));

app.use("/css", express.static(__dirname + '/css'));

app.use("/img", express.static(__dirname + '/img'));

app.use("/vendor", express.static(__dirname + '/vendor'));


app.set('view engine', 'ejs');
app.set('views', paths.join(__dirname, 'views'));

app.get('/', function(req, res) {
	let posts = blogRealm.objects('Post').sorted('timestamp', true);
	res.render('../views/blog.ejs', {posts: posts});
});

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

app.post('/write', function(req, res) {
	let title 	= req.body['title'],
			content = req.body['content'],
			timestamp = new Date();

	blogRealm.write(() => {
		blogRealm.create('Post', {title: title, content: content, timestamp: timestamp});
	});	

	res.sendFile(__dirname + "/write-complete.html");
});


app.listen(3000, function() {
	console.log("server started...")
});