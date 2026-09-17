import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const repo = 'jan-lindroos/jan-lindroos';
	const revision = 'HEAD';
	const files = await Promise.all(['README.md', 'CONTACT.md'].map(async (file) => {
		const res = await fetch(`https://api.github.com/repos/${repo}/contents/${file}?ref=${revision}`, {
			headers: { Accept: 'application/vnd.github.html+json' }
		});
		if (!res.ok) throw new Error(`${file}: GitHub returned ${res.status}`);
		const source = await res.text();
		// GitHub prefixes heading IDs but leaves their fragment links unprefixed.
		const html = source.replace(/href="#([^"]+)"/g, (href, id: string) =>
			source.includes(`id="user-content-${id}"`) ? `href="#user-content-${id}"` : href
		);
		return { repo, file, revision, html };
	}));

	return { files };
};
