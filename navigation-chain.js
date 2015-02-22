function NavigationChain() {
	var self = this;

	construct.apply(this, arguments);

	function construct(/*... NavigationController */) {
		var controllers = Array.prototype.slice.call(arguments);

		// add this.input
		Object.defineProperty(this, 'input', {
			get: function() {
				for (var i = 0; i < controllers.length; ++i) {
					var input = controllers[i].input;

					if (input) {
						return input;
					}
				}
			}
		});
	}
}
