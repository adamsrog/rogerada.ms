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
			submitted: new Date().getTime(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});

		var postId = Posts.insert(post);

		return postId;
	},
	upvote: function(postId) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to upvote");
		
		var post = Posts.findOne(postId);
		
		// confirm post exists
		if (!post)
			throw new Meteor.Error(422, "Post not found");

		// check if user has already upvoted the post
		if (_.include(post.upvoters, user._id))
			throw new Meteor.Error(422, "Already upvoted this post");

		// add user to upvote list and increment votes
		Posts.update(post._id, {
			$addToSet: {upvoters: user._id},
			$inc: {votes: 1}
		});
	}
});
