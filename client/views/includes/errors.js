Template.errors.helpers({
	errors: function() {
		return Errors.find();
	}
});

// .rendered runs directly after page finished (1ms delay)
Template.error.rendered = function() {
	var error = this.data;
	Meteor.defer(function() {
		Errors.update(error._id, {
			$set: {seen: true}
		});
	});
};