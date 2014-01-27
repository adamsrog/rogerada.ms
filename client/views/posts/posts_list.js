// create a template header that returns all items in Posts collection
Template.postsList.helpers({
	posts: function() {
		return Posts.find({}, {
			sort: { submitted: -1 }
		});
	}
});