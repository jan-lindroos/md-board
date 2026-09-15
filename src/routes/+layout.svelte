<script lang="ts">
	import Butterfly from '$lib/Butterfly.svelte';
	let { children } = $props();
	let year = new Date().getFullYear();
</script>

<svelte:head>
	<title>Jan Lindroos</title>
</svelte:head>

<main>
	<svelte:boundary>
		{@render children()}
		{#snippet pending()}
			<p class="text-muted">Loading most recent info…</p>
		{/snippet}
		{#snippet failed(error)}
			<p class="text-muted">Could not load content: {error instanceof Error ? error.message : String(error)}</p>
		{/snippet}
	</svelte:boundary>

	<div class="padding-top text-muted">© Jan Lindroos, {year}</div>
</main>

<Butterfly />

<style>
	:global(:root) {
		color-scheme: light dark;
		--page-background: #ffffff;
		--page-foreground: #1f2328;
		--muted-foreground: #59636e;
		--panel-border: #d1d9e0;
	}

	main {
		max-width: 720px;
		margin: 0 auto;
		padding: 0 1rem 4rem;
	}

	:global(html),
	:global(body) {
		background: var(--page-background);
		color: var(--page-foreground);
	}

	:global(.text-muted) {
		color: var(--muted-foreground);
		font-size: 12px;
		font-family: 'Monaspace Neon', monospace;
		font-weight: 400;
	}

	@media (max-width: 640px) {
		:global(.text-muted) {
			font-size: 13px;
		}
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--page-background: #000000;
			--page-foreground: #f0f6fc;
			--muted-foreground: #a1a1a1;
			--panel-border: #303030;
		}
	}

    .padding-top {
		margin-top: 16px;
	}
</style>
