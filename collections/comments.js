Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes) {
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);

		// error checking
		if (!user)
			throw new Meteor.Error(401, "You need to log in to make comments.");
		if (!commentAttributes.body)
			throw new Meteor.Error(422, "No content in comment.");
		if (!post)
			throw new Meteor.Error(422, "You must comment on a post.");

		// create the comment object that'll be inserted
		comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		// increment the comments count (denormalization)
		Posts.update(comment.postId, {
			$inc: {commentsCount: 1}
		});

		// create the comment, save the id
		comment._id = Comments.insert(comment);

		createCommentNotification(comment);

		return comment._id;
	}
});