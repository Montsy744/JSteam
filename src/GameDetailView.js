import { API_KEY } from './config.js';
import Router from './Router.js';
import View from './View.js';

export default class GameDetailView extends View {
	game;
	screenshots;

	/**
	 * Affiche la vue et lance la récupération des infos du jeu à afficher.
	 * @param {string} slug identifiant (slug) du jeu à afficher
	 */
	show(slug) {
		super.show();
		// ajout de l'état "loading"
		this.element.classList.add('is-loading');
		// création des URL de l'API pour le détail et les screenshots
		const detailApiUrl =
				`https://api.rawg.io/api/games/` + encodeURIComponent(slug),
			screenshotsApiUrl = detailApiUrl + '/screenshots',
			apiKeyParam = `?key=${API_KEY}`;
		// récupération du détail d'un jeu
		fetch(detailApiUrl + apiKeyParam)
			.then(response => response.json())
			.then(data => (this.game = data)) // enregistrement dans this.game (cf. render())
			.then(() => fetch(screenshotsApiUrl + apiKeyParam)) // appel AJAX screenshots
			.then(response => response.json())
			.then(data => {
				this.screenshots = data;
				this.render();
				this.element.classList.remove('is-loading');
			});
	}

	/**
	 * Méthode permettant de rendre le contenu de this.game et this.screenshots dans la vue.
	 * Déclenchée une fois que les 2 appels AJAX sont terminés (detail + screenshots)
	 * @see #show
	 */
	render() {
		const {
			slug,
			name,
			background_image,
			released,
			metacritic,
			description,
			parent_platforms,
			genres,
			website,
		} = this.game;
		const releasedDate = new Date(released);
		// rendu dans la vue
		this.element.innerHTML = /*html*/ `
			<div class="backgroundImage">
				<img src="${background_image}" />
			</div>
			<header>
				<div class="breadcrumb">
					<a href="/">Tous les jeux</a>
					&gt;
					<a href="/detail-${slug}">${name}</a>
				</div>
				<h2>
					${name}
					<span class="metacritic">${metacritic}</span>
				</h2>
			</header>
			<section class="content">
				<div class="screenshots">
					${this.screenshots.results
						.map(({ image }) => `<a href="${image}"><img src="${image}" /></a>`)
						.join('')}
				</div>
				<div class="infos">
					<p class="label">Genres :</p>
					<ul class="genres">${genres
						.map(genre => `<li>${genre.name}</li>`)
						.join('')}</ul>
					<p class="label">Date de parution :</p>
					<time datetime="${released}">${releasedDate.toLocaleDateString()}</time>
					<p class="label">Plateformes :</p>
					<ul class="platforms">${parent_platforms
						.map(
							parent =>
								`<li><img src="images/platforms/${parent.platform.slug}.svg" /></li>`
						)
						.join('')}</ul>
					<p class="label">Site officiel :</p>
					<a class="website" href="${website}">${website}</a>
				</div>
			</section>
			<section class="description">${description}</section>
			`;

		// écoute du clic sur les liens du "fil d'Ariane" pour éviter le rechargement de page
		this.element.querySelectorAll('.breadcrumb a').forEach(link =>
			link.addEventListener('click', event => {
				event.preventDefault();
				Router.navigate(event.currentTarget.getAttribute('href'));
			})
		);
	}
}
