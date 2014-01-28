if (Posts.find().count() === 0) {

	Posts.insert({
		title: 'rog\'s homepage',
		author: 'roger adams',
		url: 'http://rogerada.ms',
		submitted: new Date().getTime(),
		commentsCount: 0,
		upvoters: [],
		votes: 0

	});

	Posts.insert({
		title: 'Seahawks.com',
		author: 'roger adams',
		url: 'http://simplicity-studios.com',
		submitted: new Date().getTime(),
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});
}