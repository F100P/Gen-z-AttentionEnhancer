var alreadyExist = document.getElementById('zplayer');
console.log(alreadyExist);
if (alreadyExist != null) {
	alreadyExist.remove();
	console.log('remove old instance');
} else {
	var div = document.createElement('div');
	div.id = 'zplayer';
	div.className = 'popup';
	div.style.width = '20vw';
	div.style.height = '11.25vw';
	div.style.position = 'fixed';
	div.style.top = '0px';
	div.style.right = '0px';

	div.style.zIndex = '2000';
	// div.style.resize = 'both';
	//div.style.overflow = 'auto';

	//div.style.borderTop = '10px solid rgba(0, 0, 0, .4)';

	div.innerHTML = `<div class="popup-header noselect"></div>
    <iframe width="99%" height="99%" border="0px" name="iframe1" id="iframe1"
    frameborder="0" border="0" cellspacing="0" resize = "both" overflow="auto" 
    
src="https://www.youtube.com/embed/gvhHgShgHGc?rel=0&amp;autoplay=1&mute=1">
</iframe>
`;
	console.log('new instance');
	document.body.appendChild(div);
	// document.styleSheets[0].insertRule('#player:hover {color:green}');
	initDragElement();
	initResizeElement();
}
// Make the DIV element draggable:

function initDragElement() {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	var popups = document.getElementsByClassName('popup');
	var elmnt = null;
	var currentZIndex = 10000; //TODO reset z index when a threshold is passed

	for (var i = 0; i < popups.length; i++) {
		var popup = popups[i];
		var header = getHeader(popup);

		popup.onmousedown = function () {
			this.style.zIndex = '' + ++currentZIndex;
		};

		if (header) {
			header.parentPopup = popup;
			header.onmousedown = dragMouseDown;
		}
	}

	function dragMouseDown(e) {
		elmnt = this.parentPopup;
		elmnt.style.zIndex = '' + ++currentZIndex;

		e = e || window.event;
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		if (!elmnt) {
			return;
		}

		e = e || window.event;
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
		elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}

	function getHeader(element) {
		var headerItems = element.getElementsByClassName('popup-header');

		if (headerItems.length === 1) {
			return headerItems[0];
		}

		return null;
	}
}

function initResizeElement() {
	var popups = document.getElementsByClassName('popup');
	var element = null;
	var startX, startY, startWidth, startHeight;

	for (var i = 0; i < popups.length; i++) {
		var p = popups[i];

		var right = document.createElement('div');
		right.className = 'resizer-right';
		p.appendChild(right);
		right.addEventListener('mousedown', initDrag, false);
		right.parentPopup = p;

		var bottom = document.createElement('div');
		bottom.className = 'resizer-bottom';
		p.appendChild(bottom);
		bottom.addEventListener('mousedown', initDrag, false);
		bottom.parentPopup = p;

		var both = document.createElement('div');
		both.className = 'resizer-both';
		p.appendChild(both);
		both.addEventListener('mousedown', initDrag, false);
		both.parentPopup = p;
	}

	function initDrag(e) {
		element = this.parentPopup;

		startX = e.clientX;
		startY = e.clientY;
		startWidth = parseInt(
			document.defaultView.getComputedStyle(element).width,
			10
		);
		startHeight = parseInt(
			document.defaultView.getComputedStyle(element).height,
			10
		);
		document.documentElement.addEventListener('mousemove', doDrag, false);
		document.documentElement.addEventListener('mouseup', stopDrag, false);
	}

	function doDrag(e) {
		element.style.width = startWidth + e.clientX - startX + 'px';
		element.style.height = startHeight + (e.clientY - startY) + 'px';
	}

	function stopDrag() {
		document.documentElement.removeEventListener('mousemove', doDrag, false);
		document.documentElement.removeEventListener('mouseup', stopDrag, false);
	}
}
