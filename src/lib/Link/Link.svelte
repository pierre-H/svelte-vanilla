<script lang="ts" module>
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export type Props = HTMLAnchorAttributes & {
		soft?: boolean;
		inverted?: boolean;
	};
</script>

<script lang="ts">
	let { soft, inverted, children, ...restProps }: Props = $props();
</script>

<a class:p-link--soft={soft} class:p-link--inverted={inverted} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</a>
