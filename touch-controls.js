/*globals document, keysDown*/

var TouchControl = new (function TouchControl() {
	var self = this;

	var mEnd;
	var mStart;

	var PI_2 = Math.PI * 2;
	var PI_1$4 = Math.PI / 4;
	var PI_1$8 = Math.PI / 8;
	var SENITIVITY = 1000 / 45;

	function Point(aX, aY) {
		this.x = aX;
		this.y = aY;
	}

	Point.angle = function(aCenter, aRear) {
		return Math.atan2(aCenter.y - aRear.y, aRear.x - aCenter.x);
	};

	Point.angle2PI = function(aCenter, aRear) {
		var angle = Point.angle(aCenter, aRear);

		return (angle < 0) ? PI_2 + angle : angle;
	};

	var TOUCH_PROPERTIES = 'identifier pageX pageY'.split(' ');
	function copyTouch(aTouch) {
		var retval = {};

		TOUCH_PROPERTIES.forEach(function(aKey) {
			retval[aKey] = aTouch[aKey];
		});

		return retval;
	}

	function clearKeys() {
		var directions = [
			Player.KEY_LEFT,
			Player.KEY_UP,
			Player.KEY_RIGHT,
			Player.KEY_DOWN
		];

		// clear all keys
		directions.forEach(function(aDirection) {
			delete keysDown[aDirection];
		});
	}

	var ANGLE_TO_KEYS = [
		[ Player.KEY_RIGHT ],					/* E  [ 0; +PI_1$8 )				*/
		[ Player.KEY_RIGHT, Player.KEY_UP ],	/* NE [ PI_1$8; PI_1$8 + PI_1$4 )	*/
		[ Player.KEY_UP ],						/* N  [ .. + PI_1$4 )				*/
		[ Player.KEY_LEFT, Player.KEY_UP ],		/* NW [ .. + PI_1$4 )				*/
		[ Player.KEY_LEFT ],					/* W  [ .. + PI_1$4 )				*/
		[ Player.KEY_LEFT, Player.KEY_DOWN ],	/* SW [ .. + PI_1$4 )				*/
		[ Player.KEY_DOWN ],					/* S  [ .. + PI_1$4 )				*/
		[ Player.KEY_RIGHT, Player.KEY_DOWN ],	/* SE [ .. + PI_1$4 )				*/
		[ Player.KEY_RIGHT ],					/* E  [ -PI_1$8; 0)					*/
	];
	function setKeys() {
		clearKeys();

		if (!mEnd || !mStart) {
			return;
		}

		var angle = Point.angle2PI(mStart, mEnd) + PI_1$8;
		var octet = Math.floor(angle / PI_1$4);

		clearKeys();
		ANGLE_TO_KEYS[octet].forEach(function(aKey) {
			keysDown[aKey] = true;
		});

		if (mChain) {
			mStart = mEnd;
		}

		mEnd = null;
	}

	function touchPoint(aEvent) {
		var touch = aEvent.changedTouches[0];
		var retval = new Point(touch.screenX, touch.screenY);

		return retval;
	}

	function touchStart(aEvent) {
		if (mStart) {
			console.log('Multitouch detected');
		}

		mStart = touchPoint(aEvent);
		clearKeys();
	}

	function touchEnd(aEvent) {
		mStart = null;
		mEnd = null;
		clearKeys();
	}

	function touchMove(aEvent) {
		if (!mEnd) {
			setTimeout(setKeys, SENITIVITY);
		}

		// interpolate?
		mEnd = touchPoint(aEvent);
	}

	self.setChain = function(aChain) {
		mChain = !!aChain;
	};

	var mElement;
	self.install = function(aElement) {
		if (mElement) {
			self.uninstall();
		}

		mElement = aElement;

		mElement.addEventListener("touchstart", touchStart, false);
		mElement.addEventListener("touchend", touchEnd, false);
		mElement.addEventListener("touchcancel", touchEnd, false);
		mElement.addEventListener("touchleave", touchEnd, false);
		mElement.addEventListener("touchmove", touchMove, false);
	};

	self.uninstall = function() {
		if (!mElement) {
			return;
		}

		mElement.removeEventListener("touchstart", touchStart, false);
		mElement.removeEventListener("touchend", touchEnd, false);
		mElement.removeEventListener("touchcancel", touchEnd, false);
		mElement.removeEventListener("touchleave", touchEnd, false);
		mElement.removeEventListener("touchmove", touchMove, false);

		mElement = null;
	};
})();

TouchControl.install(document.getElementsByTagName('canvas')[0] || document);

// DEBUG
var touchChain = true;
document.write('<input type="checkbox" checked onclick="TouchControl.setChain(touchChain = !touchChain)" style="position: absolute; bottom: 10px; right: 20px">');