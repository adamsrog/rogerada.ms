// name the collection
Posts = new Meteor.Collection('posts');

// set permissions on updating/deleting posts
Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

// only allow editing of url and title fields
Posts.deny({
	update: function(userId, post, fieldNames) {
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user(), postWithSameLink = Posts.findOne({url: postAttributes.url});

		// ensure user is logged in
		if (!user)
			throw new Meteor.Error(401, 
				"You need to log in before you can add a post.");

		// ensure the post has a title
		if (!postAttributes.title)
			throw new Meteor.Error(422, 
				"You need to provide a title for your post.");

		// check that there are no posts with the same link
		if (postAttributes.url && postWithSameLink) {
			throw new Meteor.Error(302,
				"This link has already been posted.",
				postWithSameLink._id);
		}

		// pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	}
});
