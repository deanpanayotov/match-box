function KeyboardNavigation() {
	var self = this;

	construct.apply(this, arguments);

	var mKeyboard;
	var mRecogniser;
	var mDirections;

	function construct(aKeyboard, aDirections, aRecogniser) {
		var directions = aDirections || 'EWNS';

		mDirections = typeof(directions) === 'string'
			? KeyboardNavigation[directions]
			: directions;

		mKeyboard = aKeyboard;
		mRecogniser = aRecogniser || KeyboardNavigation.WASD_AND_ARROWS;

		// add this.input
		Object.defineProperty(this, 'input', {
			get: input
		});
	}

	function getKeys(aKeyboard) {
		var keys = '';

		if (mRecogniser.isRight(aKeyboard)) {
			keys += 'E'
		}
		if (mRecogniser.isLeft(aKeyboard)) {
			keys += 'W'
		}
		if (mRecogniser.isUp(aKeyboard)) {
			keys += 'N';
		}
		if (mRecogniser.isDown(aKeyboard)) {
			keys += 'S';
		}

		return keys;
	}

	function input() {
		var keys = getKeys(mKeyboard);

		return mDirections[keys];
	}
}

(function() {
	KeyboardNavigation.WASD_AND_ARROWS = {
		isUp: function(aKeyboard) {
			return aKeyboard[38] || aKeyboard[87];
		},

		isDown: function(aKeyboard) {
			return aKeyboard[40] || aKeyboard[83];
		},

		isRight: function(aKeyboard) {
			return aKeyboard[39] || aKeyboard[68];
		},

		isLeft: function(aKeyboard) {
			return aKeyboard[37] || aKeyboard[65];
		}
	};

	function extend(aObject) {
		for (var i = 1; i < arguments.length; ++i) {
			var ext = arguments[i];

			Object.keys(ext).forEach(function(aKey) {
				aObject[aKey] = ext[aKey];
			});
		}

		return aObject;
	}

	KeyboardNavigation.EW = {
		'E': 'E',
		'W': 'W'
	};

	KeyboardNavigation.NS = {
		'N': 'N',
		'S': 'S'
	};

	KeyboardNavigation.EWNS	= extend({
		'EWN': 'N',
		'WNS': 'W',
		'EWS': 'S',
		'ENS': 'E'
	}, KeyboardNavigation.EW, KeyboardNavigation.NS);

	KeyboardNavigation.EWNS8 = extend({
		'EN': 'NE',
		'WN': 'NW',
		'WS': 'SW',
		'ES': 'SE'
	}, KeyboardNavigation.EWNS);
})();
