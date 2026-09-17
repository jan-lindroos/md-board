<script lang="ts">
	import { onMount, tick } from 'svelte';

	let butterfly = $state<string>();

	let playing = $state(false);
	let video = $state<HTMLVideoElement>();

	onMount(() => {
		// Old Firefox renders the webm's alpha channel as black, so skip it entirely.
		if (navigator.userAgent.includes('Firefox')) return;
		butterfly = document.createElement('video').canPlayType('video/quicktime')
			? '/butterfly-pingpong.mov'
			: '/butterfly-pingpong.webm';
		void tick().then(() => {
			if (!video) return;
			video.muted = true;
			void video.play().catch(() => {
				// Autoplay may be blocked by the browser; keep the decoration hidden.
			});
		});
	});

</script>

{#if butterfly}
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
