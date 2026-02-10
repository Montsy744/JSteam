import { API_KEY } from './config.js';
import renderGameThumbnail from './renderGameThumbnail';
import Router from './Router.js';
import View from './View.js';

export default class GameListView extends View {
	searchForm;
	toggleSearchButton;

	constructor(element) {
		super(element);
		// détection du clic sur le bouton "loupe" pour afficher/masquer le form de recherche
		this.toggleSearchButton = this.element.querySelector('.toggleSearchButton');
		this.toggleSearchButton.addEventListener('click', event =>
			this.toggleSearchForm(event)
		);
		// détection de la soumission du formulaire de recherche
		this.searchForm = this.element.querySelector('.searchForm');
		this.searchForm.addEventListener('submit', event =>
			this.handleSearchFormSubmit(event)
		);
	}

	show() {
		super.show();
		// affichage initial de la liste des jeux
		this.renderGameList();
	}

	/**
	 * Méthode d'affichage de la liste des jeux.
	 * Utilisée :
	 * - au chargement de la page pour l'affichage initial
	 * - et à chaque fois qu'on soumet le formulaire de recherche
	 * @param {string} search chaîne de caractère recherchée dans le nom des jeux
	 * @param {string} ordering ordre d'affichage des résultats
	 */
	renderGameList(search = '', ordering) {
		this.element.querySelector('.results').classList.add('is-loading');
		this.searchForm.querySelector('button').disabled = true;
		this.searchForm.querySelector('button').setAttribute('disabled', true);
		fetch(
			`https://api.rawg.io/api/games?search=${encodeURIComponent(
				search
			)}&ordering=${encodeURIComponent(ordering)}&key=${API_KEY}`
		)
			.then(response => response.json())
			.then(data => {
				// rendu de la liste des jeux
				let html = '';
				data.results.forEach(game => (html += renderGameThumbnail(game)));
				this.element.querySelector('.results').innerHTML = html;
				// suppression du "loader" et réactivation du formulaire
				this.element.querySelector('.results').classList.remove('is-loading');
				this.searchForm.querySelector('button').disabled = false;
				// détection du clic sur les vignettes de jeu
				// pour navigation vers la page détail (sans rechargement de page)
				const gameLinks = this.element.querySelectorAll('.results > a');
				gameLinks.forEach(gameLink =>
					gameLink.addEventListener('click', event => {
						event.preventDefault();
						Router.navigate(gameLink.getAttribute('href'));
					})
				);
			});
	}
	/**
	 * Fonction qui permet d'afficher ou masquer le formulaire de recherche
	 * @param {Event} event événement déclenché par le bouton sur lequel on a cliqué
	 */
	toggleSearchForm(event) {
		const isOpened = this.searchForm.getAttribute('style') !== 'display: none;';
		if (!isOpened) {
			this.searchForm.setAttribute('style', '');
			this.toggleSearchButton.classList.add('opened');
		} else {
			this.searchForm.setAttribute('style', 'display: none;');
			this.toggleSearchButton.classList.remove('opened');
		}
	}
	/**
	 * Méthode déclenchée quand on soumet le formulaire de recherche.
	 * Met à jour l'affichage des résultats.
	 * @param {Event} event événement déclenché par le formulaire de recherche au submit
	 * @see #renderGameList
	 */
	handleSearchFormSubmit(event) {
		event.preventDefault();
		const searchInput = this.searchForm.querySelector('[name=search]'),
			orderingSelect = this.searchForm.querySelector('[name=ordering]');
		this.renderGameList(searchInput.value, orderingSelect.value);
	}
}
