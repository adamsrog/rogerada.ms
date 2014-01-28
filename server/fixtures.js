// add some posts to work with post-reset
if (Posts.find().count() === 0) {

	Posts.insert({
		title: 'rog\'s homepage',
		author: 'rog',
		url: 'http://rogerada.ms',
		submitted: new Date().getTime(),
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});

	Posts.insert({
		title: 'Seahawks.com',
		author: 'rog',
		url: 'http://seahawks.com',
		submitted: new Date().getTime(),
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});

	Posts.insert({
		title: 'Seahawks.net Message Boards',
		author: 'rog',
		url: 'http://seahawks.net',
		submitted: new Date().getTime(),
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});

	Posts.insert({
		title: 'hackernews',
		author: 'rog',
		url: 'http://news.ycombinator.com',
		submitted: new Date().getTime(),
		commentsCount: 0,
		upvoters: [],
		votes: 0

	});

	Posts.insert({
		title: 'bleacher report',
		author: 'rog',
		url: 'http://bleacherreport.com',
		submitted: new Date().getTime(),
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});

	Posts.insert({
		title: 'espn west blog',
		author: 'rog',
		url: 'http://espn.go.com/blog/nfcwest/',
		submitted: new Date().getTime(),
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});

}