import { info } from "./type";

export default function renderGameThumbnail(data:info) {
	const releasedDate = new Date(data.released);
	return `<a href="/detail-${data.slug}">
				<img src="${data.background_image || '/images/default-thumbnail.svg'}" />
				<footer>
					<h3>${data.name}</h3>
					<div class="infos">
						<time datetime="${data.released}">${releasedDate.toLocaleDateString()}</time>
						<span class="metacritic">${data.metacritic || ''}</span>
					</div>
				</footer>
			</a>`;
}
