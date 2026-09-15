<script lang="ts">
	import 'github-markdown-css/github-markdown.css';

	const REPO = 'jan-lindroos/jan-lindroos';

	// Old Firefox renders the webm's alpha channel as black, so skip it entirely.
	const isFirefox = navigator.userAgent.includes('Firefox');

	const butterfly = document.createElement('video').canPlayType('video/quicktime')
		? '/butterfly-pingpong.mov'
		: '/butterfly-pingpong.webm';

	let video: HTMLVideoElement;
	let playing = $state(false);

	const readme: Promise<string> = fetch(`https://api.github.com/repos/${REPO}/readme`, {
		cache: 'no-store',
		headers: { Accept: 'application/vnd.github.html+json' }
	}).then(async (res) => {
		if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
		const document = new DOMParser().parseFromString(await res.text(), 'text/html');
		// GitHub's rendered image URLs expire, so serve our wall image locally.
		for (const image of document.querySelectorAll('img[alt="wall"]')) {
			image.setAttribute('src', '/wall.png');
			image.removeAttribute('srcset');
		}
		return document.body.innerHTML;
	});
</script>

<svelte:head>
	<title>jan-lindroos</title>
</svelte:head>

<main>
	<div class="box">
		<div class="title">
			<a class="path" href="https://github.com/jan-lindroos"
				>jan-lindroos<span class="sep">/</span>README.md</a
			>
			<span class="aside">
				(click for GitHub;
				<a href="https://www.linkedin.com/in/jan-lindroos/">LinkedIn</a>; jan@lindroos.co.uk)
			</span>
		</div>
		<div class="markdown-body">
			{#await readme}
				<p>Loading…</p>
			{:then html}
				{@html html}
			{:catch error}
				<p>Could not load the README: {error.message}</p>
			{/await}
		</div>
	</div>
	<div class="copyright">© {new Date().getFullYear()} Jan Lindroos</div>
</main>

<svelte:document
	onpointerdown={() => {
		if (video?.paused) video.play().catch(() => {});
	}}
/>

{#if !isFirefox}
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		bind:this={video}
		class="butterfly"
		class:playing
		src={butterfly}
		autoplay
		muted
		loop
		playsinline
		onplaying={() => (playing = true)}
		onpause={() => (playing = false)}
	></video>
{/if}

<style>
	:global(:root) {
		--box-bg: #ffffff;
		--box-border: #d1d9e0;
		--box-fg: #1f2328;
		--box-fg-muted: #59636e;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--box-bg: #0d1117;
			--box-border: #3d444d;
			--box-fg: #f0f6fc;
			--box-fg-muted: #9198a1;
		}
	}

	:global(body) {
		margin: 0;
		background: var(--box-bg);
	}

	main {
		max-width: 720px;
		margin: 0 auto;
		padding: 0 1rem 4rem;
	}

	.box {
		margin-top: 24px;
		padding: 24px;
		border: 1px solid var(--box-border);
		border-radius: 12px;
		background: var(--box-bg);
	}

	.title {
		margin-bottom: 16px;
		font-family:
			'Monaspace Neon', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
			'Liberation Mono', monospace;
		font-size: 12px;
		font-weight: 400;
		color: var(--box-fg);
	}

	.path {
		color: inherit;
		text-decoration: underline;
	}

	.aside {
		color: var(--box-fg-muted);
	}

	.aside a {
		color: inherit;
		text-decoration: underline;
	}

	.sep {
		color: var(--box-fg-muted);
	}

	.copyright {
		margin-top: 16px;
		font-family:
			'Monaspace Neon', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
			'Liberation Mono', monospace;
		font-size: 12px;
		font-weight: 400;
		color: var(--box-fg-muted);
	}

	.markdown-body :global(.anchor) {
		display: none;
	}

	.butterfly {
		--butterfly-width: min(280px, 60vw);
		display: block;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		pointer-events: none;
		opacity: 0;
		width: var(--butterfly-width);
		animation:
			butterfly-cross 34s linear infinite,
			butterfly-drift-y 19s ease-in-out infinite alternate;
		mask-image:
			linear-gradient(to right, transparent, #000 18%, #000 82%, transparent),
			linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
		mask-composite: intersect;
		-webkit-mask-image:
			linear-gradient(to right, transparent, #000 18%, #000 82%, transparent),
			linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
		-webkit-mask-composite: source-in;
	}

	.butterfly.playing {
		opacity: 1;
	}

	@keyframes butterfly-cross {
		from {
			translate: calc(-1 * var(--butterfly-width));
		}
		to {
			translate: 100vw;
		}
	}

	@keyframes butterfly-drift-y {
		0% {
			transform: translateY(-4vh);
		}
		40% {
			transform: translateY(-55vh);
		}
		65% {
			transform: translateY(-22vh);
		}
		100% {
			transform: translateY(-68vh);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.butterfly {
			display: none;
		}
	}
</style>
