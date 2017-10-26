'use strict';
var express 	 = require('express'),
		bodyParser = require('body-parser'),
		Realm			 = require('realm'),
		app 			 = express();

const routes	 = require('./routes');

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

app.use((err, req, res, next) => {
		res.status(500).json(err.message);
		next();

});



blogRealm.write(() => {
	blogRealm.create('Post', {title: title, content: content, timestamp: timestamp});
});	

res.sendFile(__dirname + "/write-complete.html");
});


app.listen(3000, function() {
	console.log("server started...")
});