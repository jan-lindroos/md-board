<script lang="ts">
	import 'github-markdown-css/github-markdown.css';

	let { repo, file, html, revision = 'HEAD' }: { repo: string; file: string; html: string; revision?: string } = $props();

	const owner = $derived(repo.split('/')[0]);
	const path = $derived(file.split('/').map(encodeURIComponent).join('/'));
	const repository = $derived(repo.split('/').map(encodeURIComponent).join('/'));
	const extension = $derived(file.match(/\.[^/.]+$/)?.[0] ?? '');
	const name = $derived(extension ? file.slice(0, -extension.length) : file);
	const href = $derived(`https://github.com/${repository}/blob/${encodeURIComponent(revision)}/${path}`);

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
		border: 1px solid var(--panel-border);
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
		color: var(--muted-foreground);
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

	.markdown-body :global(a) {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (max-width: 640px) {
		.title {
			font-size: 13px;
		}

		.markdown-body,
		.markdown-body :global(.markdown-body) {
			font-size: 15px;
			line-height: 22px;
		}

		.markdown-body :global(h1),
		.markdown-body :global(h2) {
			font-size: 22px;
		}
	}

	@media (prefers-color-scheme: dark) {
		.markdown-body,
		.markdown-body :global(.markdown-body) {
			--bgColor-default: var(--page-background);
			--bgColor-muted: #111111;
			--bgColor-neutral-muted: #ffffff1a;
			--fgColor-muted: var(--muted-foreground);
			--borderColor-default: var(--panel-border);
			--borderColor-muted: #303030b3;
		}
	}
</style>
