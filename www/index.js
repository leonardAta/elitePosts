'use strict';
var express 	 = require('express'),
		bodyParser = require('body-parser'),
		Realm			 = require('realm');

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

app.use("/css", express.static(__dirname + '/css'));

app.use("/img", express.static(__dirname + '/img'));

app.use("/vendor", express.static(__dirname + '/vendor'));


app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	let posts = blogRealm.objects('Post').sorted('timestamp', true);
	res.render('index.ejs', {posts: posts});
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