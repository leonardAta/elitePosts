const routes = require('express').Router();
//var controller = require("/controllers");

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

// routes.get('/', function(req, res) {
// 	let posts = blogRealm.objects('Post').sorted('timestamp', true);
// 	res.render('index.ejs', {posts: posts});
// });

// routes.get('/blog', function(req, res) {
// 	let posts = blogRealm.objects('Post').sorted('timestamp', true);
// 	res.render('blog.ejs', {posts:posts});
// })

routes.get('/about', function(req, res) {
	res.render('about.ejs');
});

routes.get('/write', function(req, res) {
	res.sendFile(__dirname + "/write.html");
});

routes.get('/home', function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

routes.get('/post', function(req, res) {
	res.sendFile(__dirname + "/post.html");
});

routes.post('/write', function(req, res) {
	let title 	= req.body['title'],
			content = req.body['content'],
			timestamp = new Date();
});

// routes.get('../views/includes', function(req, res) {
// 	res.sendFile(__dirname + "/header.ejs");
// });

// routes.get('/', function(req, res) {
// 	let posts = blogRealm.objects('Post').sorted('timestamp', true);
// 	res.render('index.ejs', {posts: posts});
// });

module.exports = routes;