var mongoose 		= require('mongoose'),
		express 		= require('express'),
		bodyParser 	= require('body-parser'),
  	Realm 			= require('realm'),
    Schema      = mongoose.Schema;

var app = express();

let PostSchema =  ({
  name: 'Post',
  properties: {
    timestamp: Date,
    title: 'string',
    content: 'string'
  },
});

var blogRealm = new Realm({
  path: 'blog.realm',
  schema: [PostSchema]
});

// var PostSchema = new Schema ({
//   title: String,
//   author: String,
//   content: String,
//   timestamp: Date,
//   comments: [{body: String, date: Date}],

// });


module.exports = mongoose.model('Post', PostSchema);