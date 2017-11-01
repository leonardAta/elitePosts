var mongoose = require('mongoose');
var	Realm		 = require('realm');
const Schema = mongoose.Schema;

PostSchema = new mongoose.Schema({
	name: {type: 'string'},
	properties: {
		timestamp: 'date',
		title:'string',
		content: 'string'
	}
});

// var blogRealm = new Realm({
// 	path:'blog.realm',
// 	schema: [PostSchema]
// });

module.exports = mongoose.model('Post', PostSchema);