!(function () {
	'use strict';
	var t,
		e,
		s = function (t, e, s, n) {
			if ('a' === s && !n)
				throw new TypeError('Private accessor was defined without a getter');
			if ('function' == typeof e ? t !== e || !n : !e.has(t))
				throw new TypeError(
					'Cannot read private member from an object whose class did not declare it'
				);
			return 'm' === s ? n : 'a' === s ? n.call(t) : n ? n.value : e.get(t);
		};
	class n {
		static setMenuElement(n) {
			(!(function (t, e, s, n, r) {
				if ('m' === n) throw new TypeError('Private method is not writable');
				if ('a' === n && !r)
					throw new TypeError('Private accessor was defined without a setter');
				if ('function' == typeof e ? t !== e || !r : !e.has(t))
					throw new TypeError(
						'Cannot write private member to an object whose class did not declare it'
					);
				'a' === n ? r.call(t, s) : r ? (r.value = s) : e.set(t, s);
			})(this, t, n, 'f', e),
				s(this, t, 'f', e)
					.querySelectorAll('a')
					.forEach(e =>
						e.addEventListener('click', e => {
							e.preventDefault();
							const s = e.currentTarget.getAttribute('href');
							t.navigate(s);
						})
					));
		}
		static navigate(n, r = !1) {
			const a = this.routes.find(t => {
				if (t.path.endsWith('*')) {
					const e = t.path.replace('*', '');
					return n.startsWith(e);
				}
				return t.path === n;
			});
			if (a) {
				let i;
				if (
					(this.currentRoute && this.currentRoute.view.hide(),
					(this.currentRoute = a),
					a.path.endsWith('*'))
				) {
					const t = a.path.replace('*', '');
					i = n.replace(t, '');
				}
				(a.view.show(i), (this.titleElement.innerHTML = `<h1>${a.title}</h1>`));
				const o = s(this, t, 'f', e).querySelector('a.active'),
					l = s(this, t, 'f', e).querySelector(`a[href="${n}"]`);
				(o?.classList.remove('active'),
					l?.classList.add('active'),
					r || window.history.pushState(null, null, n));
			}
		}
	}
	((t = n),
		Object.defineProperty(n, 'routes', {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: [],
		}),
		(e = { value: void 0 }));
	var r = n;
	class a {
		constructor(t) {
			(Object.defineProperty(this, 'element', {
				enumerable: !0,
				configurable: !0,
				writable: !0,
				value: void 0,
			}),
				(this.element = t));
		}
		show() {
			this.element.classList.add('active');
		}
		hide() {
			this.element.classList.remove('active');
		}
	}
	const i = 'f953f810193748bd9d52d8fcadbcff0b';
	document.querySelector('body > footer > div:nth-of-type(2)').innerHTML +=
		' / CSS inspirée de <a href="https://store.steampowered.com/">steam</a>';
	const o = new (class extends a {
			constructor(t) {
				(super(t),
					this.element
						.querySelector('.helpForm')
						.addEventListener('submit', t => this.handleSubmit(t)));
			}
			handleSubmit(t) {
				t.preventDefault();
				const e = this.element.querySelector('input[name=subject]'),
					s = this.element.querySelector('textarea[name=body]'),
					n = e.value,
					r = s.value;
				'' !== n
					? '' !== r
						? ((window.location.href = `mailto:help@jsteam.fr?subject=${encodeURIComponent(n)}&body=${encodeURIComponent(r)}`),
							(e.value = ''),
							(s.value = ''))
						: alert('le champ "VOTRE MESSAGE" est obligatoire')
					: alert('le champ "SUJET" est obligatoire');
			}
		})(document.querySelector('.viewContent .help')),
		l = new (class extends a {
			constructor(t) {
				(super(t),
					Object.defineProperty(this, 'searchForm', {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: void 0,
					}),
					Object.defineProperty(this, 'toggleSearchButton', {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: void 0,
					}),
					(this.toggleSearchButton = this.element.querySelector(
						'.toggleSearchButton'
					)),
					this.toggleSearchButton.addEventListener('click', t =>
						this.toggleSearchForm(t)
					),
					(this.searchForm = this.element.querySelector('.searchForm')),
					this.searchForm.addEventListener('submit', t =>
						this.handleSearchFormSubmit(t)
					));
			}
			show() {
				(super.show(), this.renderGameList());
			}
			renderGameList(t = '', e) {
				(this.element.querySelector('.results').classList.add('is-loading'),
					(this.searchForm.querySelector('button').disabled = !0),
					this.searchForm.querySelector('button').setAttribute('disabled', !0),
					fetch(
						`https://api.rawg.io/api/games?search=${encodeURIComponent(t)}&ordering=${encodeURIComponent(e)}&key=${i}`
					)
						.then(t => t.json())
						.then(t => {
							let e = '';
							(t.results.forEach(
								t =>
									(e += (function (t) {
										const e = new Date(t.released);
										return `<a href="/detail-${t.slug}">\n\t\t\t\t<img src="${t.background_image || '/images/default-thumbnail.svg'}" />\n\t\t\t\t<footer>\n\t\t\t\t\t<h3>${t.name}</h3>\n\t\t\t\t\t<div class="infos">\n\t\t\t\t\t\t<time datetime="${t.released}">${e.toLocaleDateString()}</time>\n\t\t\t\t\t\t<span class="metacritic">${t.metacritic || ''}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</footer>\n\t\t\t</a>`;
									})(t))
							),
								(this.element.querySelector('.results').innerHTML = e),
								this.element
									.querySelector('.results')
									.classList.remove('is-loading'),
								(this.searchForm.querySelector('button').disabled = !1),
								this.element.querySelectorAll('.results > a').forEach(t =>
									t.addEventListener('click', e => {
										(e.preventDefault(), r.navigate(t.getAttribute('href')));
									})
								));
						}));
			}
			toggleSearchForm(t) {
				'display: none;' !== this.searchForm.getAttribute('style')
					? (this.searchForm.setAttribute('style', 'display: none;'),
						this.toggleSearchButton.classList.remove('opened'))
					: (this.searchForm.setAttribute('style', ''),
						this.toggleSearchButton.classList.add('opened'));
			}
			handleSearchFormSubmit(t) {
				t.preventDefault();
				const e = this.searchForm.querySelector('[name=search]'),
					s = this.searchForm.querySelector('[name=ordering]');
				this.renderGameList(e.value, s.value);
			}
		})(document.querySelector('.viewContent > .gameList')),
		c = new (class extends a {
			show() {
				(super.show(),
					fetch('./about.html')
						.then(t => t.text())
						.then(t => this.showFileContent(t)));
			}
			showFileContent(t) {
				((this.element.innerHTML = t),
					this.element
						.querySelector('.button')
						.addEventListener('click', t => this.handleButtonClick(t)));
			}
			handleButtonClick(t) {
				(t.preventDefault(), r.navigate('/help'));
			}
		})(document.querySelector('.viewContent > .about')),
		h = new (class extends a {
			constructor() {
				(super(...arguments),
					Object.defineProperty(this, 'game', {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: void 0,
					}),
					Object.defineProperty(this, 'screenshots', {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: void 0,
					}));
			}
			show(t) {
				(super.show(), this.element.classList.add('is-loading'));
				const e = 'https://api.rawg.io/api/games/' + encodeURIComponent(t),
					s = e + '/screenshots',
					n = `?key=${i}`;
				fetch(e + n)
					.then(t => t.json())
					.then(t => (this.game = t))
					.then(() => fetch(s + n))
					.then(t => t.json())
					.then(t => {
						((this.screenshots = t),
							this.render(),
							this.element.classList.remove('is-loading'));
					});
			}
			render() {
				const {
						slug: t,
						name: e,
						background_image: s,
						released: n,
						metacritic: a,
						description: i,
						parent_platforms: o,
						genres: l,
						website: c,
					} = this.game,
					h = new Date(n);
				((this.element.innerHTML = `\n\t\t\t<div class="backgroundImage">\n\t\t\t\t<img src="${s}" />\n\t\t\t</div>\n\t\t\t<header>\n\t\t\t\t<div class="breadcrumb">\n\t\t\t\t\t<a href="/">Tous les jeux</a>\n\t\t\t\t\t&gt;\n\t\t\t\t\t<a href="/detail-${t}">${e}</a>\n\t\t\t\t</div>\n\t\t\t\t<h2>\n\t\t\t\t\t${e}\n\t\t\t\t\t<span class="metacritic">${a}</span>\n\t\t\t\t</h2>\n\t\t\t</header>\n\t\t\t<section class="content">\n\t\t\t\t<div class="screenshots">\n\t\t\t\t\t${this.screenshots.results.map(({ image: t }) => `<a href="${t}"><img src="${t}" /></a>`).join('')}\n\t\t\t\t</div>\n\t\t\t\t<div class="infos">\n\t\t\t\t\t<p class="label">Genres :</p>\n\t\t\t\t\t<ul class="genres">${l.map(t => `<li>${t.name}</li>`).join('')}</ul>\n\t\t\t\t\t<p class="label">Date de parution :</p>\n\t\t\t\t\t<time datetime="${n}">${h.toLocaleDateString()}</time>\n\t\t\t\t\t<p class="label">Plateformes :</p>\n\t\t\t\t\t<ul class="platforms">${o.map(t => `<li><img src="images/platforms/${t.platform.slug}.svg" /></li>`).join('')}</ul>\n\t\t\t\t\t<p class="label">Site officiel :</p>\n\t\t\t\t\t<a class="website" href="${c}">${c}</a>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t<section class="description">${i}</section>\n\t\t\t`),
					this.element.querySelectorAll('.breadcrumb a').forEach(t =>
						t.addEventListener('click', t => {
							(t.preventDefault(),
								r.navigate(t.currentTarget.getAttribute('href')));
						})
					));
			}
		})(document.querySelector('.viewContent > .gameDetail')),
		u = [
			{ path: '/', view: l, title: 'Magasin' },
			{ path: '/about', view: c, title: 'À propos' },
			{ path: '/help', view: o, title: 'Support' },
			{ path: '/detail-*', view: h, title: 'Détail jeu' },
		];
	((r.routes = u),
		(r.titleElement = document.querySelector('.viewTitle')),
		r.setMenuElement(document.querySelector('.mainMenu')),
		r.navigate(window.location.pathname, !0),
		(window.onpopstate = () => r.navigate(document.location.pathname, !0)),
		console.log("You're All Variants!".toUpperCase()));
})();
//# sourceMappingURL=main.bundle.js.map
