<script lang="ts">
	import MarkdownFile from '$lib/MarkdownFile.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#each data.files as file}
	<MarkdownFile {...file} />
{/each}
