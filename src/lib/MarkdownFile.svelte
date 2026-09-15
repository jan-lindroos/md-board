<script lang="ts">
	import 'github-markdown-css/github-markdown.css';

	let { repo, file, revision = 'HEAD' }: { repo: string; file: string; revision?: string } = $props();

	const owner = $derived(repo.split('/')[0]);
	const path = $derived(file.split('/').map(encodeURIComponent).join('/'));
	const repository = $derived(repo.split('/').map(encodeURIComponent).join('/'));
	const extension = $derived(file.match(/\.[^/.]+$/)?.[0] ?? '');
	const name = $derived(extension ? file.slice(0, -extension.length) : file);
	const href = $derived(`https://github.com/${repository}/blob/${encodeURIComponent(revision)}/${path}`);

	async function fetchInnerHTML(repository: string, path: string, revision: string): Promise<string> {
		const res = await fetch(`https://api.github.com/repos/${repository}/contents/${path}?ref=${encodeURIComponent(revision)}`, {
			cache: 'no-store',
			headers: { Accept: 'application/vnd.github.html+json' }
		});
		if (!res.ok) throw new Error(`${decodeURIComponent(path)}: GitHub returned ${res.status}`);
		const document = new DOMParser().parseFromString(await res.text(), 'text/html');
		return document.body.innerHTML;
	}

	const html = $derived(await fetchInnerHTML(repository, path, revision));
</script>

<section class="file">
	<div class="title">
		<a {href}>{owner}<span class="muted">/</span>{name}<span class="muted">{extension}</span></a>
	</div>
	<div class="markdown-body">
		{@html html}
	</div>
</section>

<style>
	.file {
		margin-top: 24px;
		padding: 24px;
		border: 1px solid #d1d9e0;
		border-radius: 10px;
	}

	.title {
		margin-bottom: 20px;
		font-family: 'Monaspace Neon', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 12px;
		line-height: 1.25;
		font-weight: 400;
		overflow-wrap: anywhere;
	}

	.title a {
		color: inherit;
		text-decoration: none;
	}

	.title a:hover {
		text-decoration: underline;
	}

	.muted {
		color: #59636e;
	}

	.markdown-body,
	.markdown-body :global(.markdown-body) {
		font-size: 14px;
		line-height: 21px;
	}

	.markdown-body :global(h1),
	.markdown-body :global(h2) {
		font-size: 21px;
		font-weight: 600;
		line-height: 1.2;
	}

	.markdown-body :global(.anchor) {
		display: none;
	}

	@media (prefers-color-scheme: dark) {
		.file {
			border-color: #3d444d;
		}

		.muted {
			color: #9198a1;
		}
	}
</style>
