<script lang="ts" context="module">
	import type { HTMLImgAttributes } from 'svelte/elements';

	export type Props = HTMLImgAttributes & {
		thumbnail?: boolean;
	};
</script>

<script lang="ts">
	let { thumbnail, ...restProps }: Props = $props();
</script>

<img class:p-card__image={!thumbnail} class:p-card__thumbnail={thumbnail} {...restProps} />
