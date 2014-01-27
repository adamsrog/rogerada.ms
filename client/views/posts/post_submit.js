Template.postSubmit.events({
	'submit form': function(e) {
		// prevent the default action from triggering
		e.preventDefault();

		// create a post object to insert
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		// create the post
		Meteor.call('post', post, function(error, id) {
			if (error)
				return alert(error.reason);

			Router.go('postPage', {_id: id});
		});

		// goto the newly created post's page
		Router.go('postPage', post);
	}
})