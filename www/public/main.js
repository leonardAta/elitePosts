// var update = document.getElementById('update');
// update.addEventListener('click', function(){
// 	// add put request here
// 	fetch('Posts', {
// 		method: 'put',
// 		headers: { 'Content-Type': 'application/json'},
// 		body: JSON.stringify({
// 			// 'title': '',
// 			// 'author': '',
// 			// 'content':''
// 			//var id = req.params.id;

// 		})
// 	})
// })

// var del = document.getElementById('delete');

// del.addEventListener('click', function() {
// 	fetch('Posts', {
// 		method: 'delete',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			'name': ''
// 		})
// 	})
// })

// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://blog-elitepath:blog-elitepath@ds243325.mlab.com:43325/blog-elitepath';

// MongoClient.connect(url, function(err, db) {
// 	if (err) throw err;
// 	var myquery = { req.body.content };
// 	db.collection("Posts").deleteOne(myquery, function(err, obj) {
// 		console.log("1 document deleted");
// 		db.close();
// 		res.redirect('/');
// 	});
// });

var update = document.getElementById('update');

update.addEventListener('click', function () {
  // Send PUT Request here
  fetch('Posts', {
  	method: 'put',
  	headers: {'Content-Type': 'application/json'},
  	body: JSON.stringify({
  	// 	title: Posts[i].title,
			// author: Posts[i].author,
			// content: Posts[i].content 
			title: req.body.title,
			author: req.body.author,
			content: req.body.content
  	})
  }).then(res => {
  	if (res.ok) return res.json()
  }).then(data => {
  	console.log(data);
  })
})


















