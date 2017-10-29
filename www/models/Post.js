var mongoose = require('mongoose');
const Schema = mongoose.Schema;

PostSchema = new mongoose.Schema({
	name: 'Post',
	properties: {
		timestamp: 'date',
		title:'string',
		content: 'string'
	}
});

var blogRealm = new Realm({
	path:'blog.realm',
	schema: [PostSchema]
});

module.exports = mongoose.model('Post', PostSchema);