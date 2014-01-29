Template.header.helpers({
	// activeRouteClass helper takes a list of route names and then uses
	// Underscore's any() helper to see if any routes are the current path
	'activeRouteClass': function() {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();

		var active = _.any(args, function(name) {
			return Router.current().route.name === name
		});

		// JavaScript pattern where false && myString returns false, but true && myString returns myString
		return active && 'active';
	}
});