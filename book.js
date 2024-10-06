class BookDetailElement extends HTMLElement {
	static observedAttributes = [
		'book-title',
		'book-image',
		'book-author',
		'book-number',
		'book-language',
		'book-year',
		'book-pages',
		'book-description',
		'book-isbn',
	];

	constructor() {
		super();
	}

	connectedCallback() {
		const l10n = BookDetailElement._l10nCurrent();
		const content = document.createElement('div');

		const image = document.createElement('img');
		image.src = '/img/book/'+this.getAttribute('book-image')+'.png';
		content.appendChild(image);

		const title = document.createElement('span');
		title.classList.add('title');
		title.textContent = this.getAttribute('book-title');
		content.appendChild(title);

		const author = document.createElement('span');
		author.classList.add('author');
		author.textContent = this.getAttribute('book-author');
		content.appendChild(author);

		const description = document.createElement('span');
		description.classList.add('description');
		description.textContent = this.getAttribute('book-description');
		content.appendChild(description);

		const data = document.createElement('dl');
		new Map([
			['number', this.getAttribute('book-number')],
			['language', l10n['language_'+this.getAttribute('book-language')]],
			['year', this.getAttribute('book-year')],
			['pages', this.getAttribute('book-pages')],
			['isbn', BookDetailElement._formatIsbn(this.getAttribute('book-isbn'))],
		]).forEach((value, key) => {
			const dt = document.createElement('dt');
			dt.textContent = l10n[key];
			data.appendChild(dt);
			const dd = document.createElement('dd');
			dd.classList.add(key);
			dd.textContent = value;
			data.appendChild(dd);
		});
		content.appendChild(data);

		this.appendChild(content);
	}

	static _l10n = {
		cs: {
			isbn: 'ISBN',
			language: 'Jazyk',
			language_cs: 'Česky',
			language_en: 'Anglicky',
			number: 'Číslo',
			pages: 'Stran',
			year: 'Rok',
		},
		en: {
			isbn: 'ISBN',
			language: 'Language',
			language_cs: 'Czech',
			language_en: 'English',
			number: 'Number',
			pages: 'Pages',
			year: 'Year',
		},
	};

	static _l10nCurrent() {
		const lang = document.getRootNode().lang || 'en';
		return BookDetailElement._l10n[lang];
	};

	static _isbnDashes = new Set([2, 3, 5, 11]);

	static _formatIsbn(isbn) {
		if (isbn.length !== 13) {
			return isbn;
		}
		let formatted = '';
		for (let i = 0; i < 13; i++) {
			formatted += isbn.charAt(i);
			if (BookDetailElement._isbnDashes.has(i)) {
				formatted += '-';
			}
		}
		return formatted;
	}
}

customElements.define('book-detail', BookDetailElement);
