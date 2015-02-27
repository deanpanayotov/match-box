/*globals document, keysDown, Player, console, setTimeout*/
//jshint -W057, -W060

function TouchNavigation() {
	var self = this;

	construct.apply(this, arguments);

	var mEnd;
	var mStart;

	var mAngle;
	var mFollow;
	var mElement;
	var mDivider;
	var mDirections;
	var mSenitivity;
	var mTreshold = 3;

	function construct(aElement, aDirections, aFollow, aSensitivity) {
		var directions = aDirections || 'EWNS';

		mDirections = typeof(directions) === 'string'
			? TouchNavigation[directions]
			: directions;

		mElement = aElement;
		mFollow = !!aFollow;
		mSenitivity = aSensitivity || (1000 / 40);
		mDivider = (Math.PI * 2) / mDirections.values.length;

		installListeners();
	}

	function Point(aX, aY) {
		this.x = aX;
		this.y = aY;
	}

	Point.angle = function(aCenter, aRear) {
		return Math.atan2(aCenter.y - aRear.y, aRear.x - aCenter.x);
	};

	Point.angle2PI = function(aCenter, aRear) {
		var angle = Point.angle(aCenter, aRear);

		return (angle < 0) ? (Math.PI * 2) + angle : angle;
	};

	function clearInput() {
		self.input = null;
	}

	function setKeys() {
		if (!mEnd || !mStart) {
			clearInput();

			return;
		}

		var dx = Math.abs(mStart.x - mEnd.x);
		var dy = Math.abs(mStart.y - mEnd.y);

		// skip small artificial fluctations
		if (dx > mTreshold || dy > mTreshold) {
			mAngle = Point.angle2PI(mStart, mEnd);

			var angle = mAngle + mDirections.offset;
			var idx = Math.floor(angle / mDivider) % mDirections.values.length;

			self.input = mDirections.values[idx];

			if (mFollow) {
				mStart = mEnd;
			}
		}

		mEnd = null;
	}

	var NO_PREVENT = {
		INPUT: true,
		BUTTON: true,
		SELECT: true
	};
	function preventDefault(aEvent) {
		if (NO_PREVENT[aEvent.target.nodeName]) {
			return;
		}

		aEvent.preventDefault();
	}

	function touchPoint(aEvent) {
		var touch = aEvent.changedTouches[0];
		var retval = new Point(touch.clientX, touch.clientY);

		return retval;
	}

	function touchStart(aEvent) {
		preventDefault(aEvent);

		if (mStart) {
			console.log('Multitouch detected');
		}

		mStart = touchPoint(aEvent);
		clearInput();
	}

	function touchEnd(aEvent) {
		preventDefault(aEvent);

		mEnd = null;
		mStart = null;

		clearInput();
	}

	function touchMove(aEvent) {
		preventDefault(aEvent);

		if (!mEnd) {
			setTimeout(setKeys, mSenitivity);
		}

		// interpolate?
		mEnd = touchPoint(aEvent);
	}

	function installListeners(aElement) {
		mElement.addEventListener('touchstart', touchStart, false);
		mElement.addEventListener('touchend', touchEnd, false);
		mElement.addEventListener('touchcancel', touchEnd, false);
		mElement.addEventListener('touchleave', touchEnd, false);
		mElement.addEventListener('touchmove', touchMove, false);
	};

	self.destroy = function() {
		if (!mElement) {
			return;
		}

		mElement.removeEventListener('touchstart', touchStart, false);
		mElement.removeEventListener('touchend', touchEnd, false);
		mElement.removeEventListener('touchcancel', touchEnd, false);
		mElement.removeEventListener('touchleave', touchEnd, false);
		mElement.removeEventListener('touchmove', touchMove, false);

		mElement = null;
	};

	self.input;
	clearInput();

	self.state = {
		get input() {
			return self.input;
		},

		get angle() {
			return mAngle;
		},

		get element() {
			return mElement;
		},

		get start() {
			return mStart;
		},

		get end() {
			return mEnd;
		},

		get follow() {
			return mFollow;
		},

		set follow(aValue) {
			mFollow = !!aValue;
		},

		get directions() {
			return mDirections;
		},

		get sensitivity() {
			return mSenitivity;
		},

		set sensitivity(aValue) {
			mSenitivity = aValue;
		},

		get treshold() {
			return mTreshold;
		},

		set treshold(aValue) {
			mTreshold = aValue;
		}
	};
}

TouchNavigation.EW =	{ offset: Math.PI / 2,	values: [ 'E', 'W' ] };
TouchNavigation.NS =	{ offset: 0,			values: [ 'N', 'S' ] };
TouchNavigation.EWNS =	{ offset: Math.PI / 4,	values: [ 'E', 'N', 'W', 'S' ] };
TouchNavigation.EWNS8 =	{ offset: Math.PI / 8,	values: [ 'E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE' ] };
