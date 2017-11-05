var update = document.getElementById('update');
update.addEventListener('click', function(){
	// add put request here
	fetch('Posts', {
		method: 'put',
		headers: { 'Content-Type': 'application/json'},
		body: JSON.stringify({
			'title': 'Social Marketing for Developers',
			'author': 'Leonard Ata',
			'content':''
		})
	})
})