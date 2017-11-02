const routes = require('express').Router();
//var controller = require("/controllers");

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});


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


module.exports = routes;