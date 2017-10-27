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

module.exports = mongoose.model('Post', PostSchema);