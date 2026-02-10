import View from './View.js';

export default class HelpView extends View {
	/**
	 * Récupère et écoute le submit du formulaire contenu dans `element`
	 * @param {Element} element balise HTML dans laquelle la vue peut s'afficher
	 * @see #handleSubmit
	 */
	constructor(element) {
		super(element);
		// détection du submit du formulaire
		this.element
			.querySelector('.helpForm')
			.addEventListener('submit', event => this.handleSubmit(event));
	}

	/**
	 * Méthode déclenchée au submit du formulaire de la page "Support".
	 * Vérifie si les champs sont correctement renseignés et lance la rédaction
	 * d'un email prérempli avec les infos saisies par l'utilisateur.rice
	 * @param {Event} event
	 */
	handleSubmit(event) {
		event.preventDefault();
		// récupération des 2 champs du formulaire
		const subjectInput = this.element.querySelector('input[name=subject]');
		const bodyTextarea = this.element.querySelector('textarea[name=body]');
		// récupération du texte saisi par l'utilisateur.rice
		const subject = subjectInput.value,
			body = bodyTextarea.value;
		// vérification des champs obligatoires
		if (subject === '') {
			alert('le champ "SUJET" est obligatoire');
			return;
		}
		if (body === '') {
			alert('le champ "VOTRE MESSAGE" est obligatoire');
			return;
		}
		// ouverture du client mail pour rédaction d'un email
		window.location.href = `mailto:help@jsteam.fr?subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(body)}`;
		// on vide les champs
		subjectInput.value = '';
		bodyTextarea.value = '';
		// on aurait aussi pu faire : form.reset();
	}
}