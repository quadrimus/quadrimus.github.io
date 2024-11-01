function toggleMenu() {
	document.getElementsByTagName('nav').item(0).classList.toggle('opened');
}

function highlightCodes() {
	document.querySelectorAll('code.json').forEach(highlightCode);
}

function highlightCode(code) {
	const source = code.textContent;
	code.textContent = null;
	let stringLiteral = false;
	let stringLiteralEscape = false;
	let text = '';
	for (const char of source) {
		if (char === '"') {
			if (stringLiteralEscape) {
				stringLiteralEscape = false;
				text += '\\"';
				continue;
			}
			text += char;
			if (stringLiteral) {
				stringLiteral = false;
				stringLiteralEscape = false;
				const i = document.createElement('i');
				i.textContent = text;
				code.appendChild(i);
				text = '';
				continue;
			}
			stringLiteral = true;
			continue;
		}
		if (stringLiteral) {
			if (stringLiteralEscape) {
				stringLiteralEscape = false;
				text += '\\';
			} else if (char === '\\') {
				stringLiteralEscape = true;
				continue;
			}
			text += char;
			continue;
		} else if ('{}[]:,'.includes(char)) {
			code.appendChild(document.createTextNode(text));
			text = '';
			const b = document.createElement('b');
			b.textContent = char;
			code.appendChild(b);
			continue;
		}
		text += char;
	}
	if (text.length > 0) {
		code.appendChild(document.createTextNode(text));
	}
}

let lastCopied = null;

function setLastCopied(copy) {
	if (lastCopied !== null) {
		lastCopied.textContent = 'Copy';
	}
	if (copy !== null) {
		copy.textContent = 'Copied!';
	}
	lastCopied = copy;
}

function improveCodes() {
	document.addEventListener('selectionchange', setLastCopied);
	document.querySelectorAll('code + figcaption').forEach((figcaption) => {
		const text = document.createElement('span');
		text.textContent = figcaption.textContent;
		figcaption.textContent = null;
		figcaption.appendChild(text);
		const code = figcaption.previousElementSibling;
		code.addEventListener('dblclick', () => {
			console.log(typeof(code));
			code.select();
		});
		if (navigator.clipboard) {
			const copy = document.createElement('a');
			copy.href = '#';
			copy.textContent = 'Copy';
			copy.addEventListener('click', () => {
				const selection = document.defaultView.getSelection();
				selection.selectAllChildren(code);
				navigator.clipboard.writeText(selection.toString()).finally(() => {
					setLastCopied(copy);
				});
			});
			figcaption.appendChild(copy);
		}
	});
}

function ready() {
	/fban|fbav|instagram/i.test(navigator.userAgent) && document.body.classList.add('use-px');
}
