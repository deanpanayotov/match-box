function TouchDebug() {
	function point2css(aPoint) {
		return {
			top: aPoint.y + 'px',
			left: aPoint.x + 'px'
		};
	}

	function css(aNode, aStyles) {
		for (var k in aStyles) {
			var val = aStyles[k];

			if (typeof(val) === 'number') {
				val += 'px';
			}

			aNode.style[k] = val;
		}
	}

	function show(aNode, aCondition) {
		css(aNode, {
			display: aCondition ? '' : 'none'
		});
	}

	function createMarker(aColor) {
		var marker = document.createElement('div');

		css(marker, {
			width: '10px',
			height: '10px',
			position: 'absolute',
			backgroundColor: aColor
		});

		return marker;
	}

	this.init = function() {
		this.data = TouchControl.debug();

		this.markerStart = createMarker('limegreen');
		document.body.appendChild(this.markerStart);

		this.markerEnd = createMarker('coral');
		document.body.appendChild(this.markerEnd);
	};

	this.render = function(aContext) {
		var end = this.data.end;
		var start = this.data.start;

		show(this.markerStart, start);
		show(this.markerEnd, end);
		if (!(start && end)) {
			return;
		}

		css(this.markerStart, point2css(start));
		css(this.markerEnd, point2css(end));

		/*aContext.fillStyle = 'limegreen';
		aContext.fillRect(start.x, start.y, 20, 20);
		aContext.fillStyle = 'coral';
		aContext.fillRect(end.x, end.y, 20, 20);*/

		aContext.fillStyle = 'coral';
		aContext.font = '16px Verdana';
		aContext.fillText(start.x + 'x' + start.y, aContext.canvas.width - 100, aContext.canvas.height - 25);
	};
}
