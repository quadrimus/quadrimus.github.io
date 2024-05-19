function colorizeLetters(element, colors) {
	const text = element.textContent;
	element.textContent = null;
	for (let i = 0; i < text.length; i++) {
		const span = document.createElement('span');
		span.style.color = colors[i];
		span.textContent = text.charAt(i);
		element.appendChild(span);
	}
}

function isJune() {
	return new Date().getMonth() === 5;
}

function june() {
	if (isJune() || document.location.hash === '#june') {
		const dark = document.querySelector('h1 > .dark');
		const pink = document.querySelector('h1 > .pink');
		colorizeLetters(dark, ['#a00000', '#e00000', '#ff8000', '#e0e000']);
		colorizeLetters(pink, ['#008000', '#0000e0', '#e000e0', '#a92471']);
	}
}
