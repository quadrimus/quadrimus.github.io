function isJune() {
	return new Date().getMonth() === 5;
}

function june() {
	if (isJune() || document.location.hash === '#june') {
		document.querySelector('h1 .quadrimus').style.background = 'linear-gradient(90deg in hsl longer hue, #f00000 0%, #a92471 100%) text';
	}
}
