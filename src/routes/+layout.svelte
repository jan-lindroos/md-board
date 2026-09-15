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
	main {
		max-width: 720px;
		margin: 0 auto;
		padding: 0 1rem 4rem;
	}

	:global(body) {
		background: #ffffff;
		color: #1f2328;
	}

	:global(.text-muted) {
		color: #59636e;
		font-size: 12px;
		font-family: 'Monaspace Neon', monospace;
		font-weight: 400;
	}

	@media (prefers-color-scheme: dark) {
		:global(body) {
			background: #0d1117;
			color: #f0f6fc;
		}

		:global(.text-muted) {
			color: #9198a1;
		}
	}

    .padding-top {
		margin-top: 16px;
	}
</style>
