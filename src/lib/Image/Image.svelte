<script lang="ts" context="module">
	import type { HTMLImgAttributes } from 'svelte/elements';

	export type Props = HTMLImgAttributes & {
		bordered?: boolean;
		shadowed?: boolean;
	};
</script>

<script lang="ts">
	let { bordered, shadowed, ...restProps }: Props = $props();
</script>

<img class:p-image--bordered={bordered} class:p-image--shadowed={shadowed} {...restProps} />
