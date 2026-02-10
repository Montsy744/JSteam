import Router from './Router.js';
import View from './View.js';

/**
 * Classe de la page "A propos"
 * Codée dans le TP4 / B. Charger un fichier statique
 */
export default class AboutView extends View {
	show() {
		super.show();
		// quand on affiche la page, on charge le fichier `about.html`
		// on pourrait optimiser ici le fonctionnement en ne le chargeant qu'une seule fois
		// (pour le moment à chaque fois qu'on affiche la view, une nouvelle requête AJAX est déclenchée)
		fetch('./about.html')
			.then(response => response.text()) // on récupère le texte brut contenu dans le fichier
			.then(responseText => this.showFileContent(responseText)); // on traite le texte contenu dans le fichier
	}

	/**
	 * Injecte dans la page HTML le code passé en paramètre.
	 * Ajoute également un écouteur d'événement "click" sur le bouton "nous contacter"
	 * @param {string} html code html à injecter dans la page (issu du contenu de la page about.html chargée avec fetch)
	 * @see #show
	 * @see #handleButtonClick
	 */
	showFileContent(html) {
		this.element.innerHTML = html;
		// l'ajout d'écouteur d'événement ne peut se faire qu'une fois que la page HTML a été modifiée
		// (sinon le bouton n'existe pas encore)
		this.element
			.querySelector('.button')
			.addEventListener('click', event => this.handleButtonClick(event));
	}
	/**
	 * Méthode déclenchée par le click sur le bouton "Nous contacter"
	 * @param {Event} event
	 * @see #showFileContent
	 */
	handleButtonClick(event) {
		event.preventDefault();
		Router.navigate('/help');
	}
}
