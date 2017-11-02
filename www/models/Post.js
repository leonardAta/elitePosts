var mongoose 		= require('mongoose'),
		express 		= require('express'),
		bodyParser 	= require('body-parser'),
  	Realm 			= require('realm');

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

module.exports = mongoose.model('Post', PostSchema);